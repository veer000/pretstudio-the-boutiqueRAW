import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, Tag, User } from "lucide-react";
import { blogPosts } from "../data/blogPosts";

export default function BlogPostPage() {
  const { id } = useParams({ strict: false });
  const post = blogPosts.find((p) => p.id === id);
  const related = blogPosts.filter((p) => p.id !== id).slice(0, 3);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold">Post not found</h2>
        <Link to="/blog" className="text-emerald-700 mt-4 inline-block">
          Back to Blog
        </Link>
      </div>
    );
  }

  const paragraphs = post.content.split("\n\n");

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 container mx-auto px-4 pb-6 text-white">
          <Link
            to="/blog"
            className="flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3 w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> All Posts
          </Link>
          <span className="bg-gold text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
            {post.category}
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold mt-2 leading-tight max-w-2xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <article className="lg:col-span-3">
            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8 border-b border-border pb-6">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readTime} min read
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-4 h-4" /> {post.date}
              </span>
            </div>

            <div className="prose prose-sm sm:prose max-w-none space-y-4">
              {paragraphs.map((para, i) => {
                if (para.startsWith("## ")) {
                  return (
                    <h2
                      // biome-ignore lint/suspicious/noArrayIndexKey: paragraph index
                      key={i}
                      className="font-heading text-xl font-bold text-foreground mt-6"
                    >
                      {para.replace("## ", "")}
                    </h2>
                  );
                }
                if (para.startsWith("**") && para.endsWith("**")) {
                  return (
                    <p // biome-ignore lint/suspicious/noArrayIndexKey: paragraph
                      key={i}
                      className="font-semibold text-foreground"
                    >
                      {para.replace(/\*\*/g, "")}
                    </p>
                  );
                }
                const formatted = para.replace(/\*\*(.*?)\*\*/g, "**$1**");
                return (
                  <p
                    // biome-ignore lint/suspicious/noArrayIndexKey: paragraph index is stable for this content
                    key={i}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {formatted}
                  </p>
                );
              })}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="font-heading font-bold text-lg mb-4">
                Related Posts
              </h3>
              <div className="space-y-4">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to="/blog/$id"
                    params={{ id: p.id }}
                    className="block group"
                  >
                    <div className="aspect-video rounded-xl overflow-hidden mb-2">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                      {p.category}
                    </span>
                    <h4 className="font-body font-semibold text-sm mt-1 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {p.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
