import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <div className="bg-emerald-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Fashion Stories
          </span>
          <h1 className="font-heading text-4xl font-bold mt-2">
            Style Journal
          </h1>
          <p className="text-emerald-100 mt-2">
            Tips, trends, and inspiration from Pakistan's fashion world
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <Link
              key={post.id}
              to="/blog/$id"
              params={{ id: post.id }}
              className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-card transition-all product-card-hover"
              data-ocid={`blog.item.${i + 1}`}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" /> {post.readTime} min read
                  </span>
                </div>
                <h2 className="font-heading font-bold text-lg text-foreground leading-snug mb-2 group-hover:text-emerald-700 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {post.author}
                    </p>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    Read More <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
