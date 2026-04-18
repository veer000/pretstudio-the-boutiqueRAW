import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { collections } from "../data/collections";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen">
      <div className="bg-emerald-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Browse
          </span>
          <h1 className="font-heading text-4xl font-bold mt-2">
            All Collections
          </h1>
          <p className="text-emerald-100 mt-2">
            Find the perfect outfit for every occasion
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col, i) => (
            <Link
              key={col.id}
              to="/collections/$id"
              params={{ id: col.id }}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] block"
              data-ocid={`collections.item.${i + 1}`}
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              {col.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
                    {col.badge}
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="font-heading font-bold text-2xl mb-1">
                  {col.name}
                </h2>
                <p className="text-sm text-white/80 mb-2">{col.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gold font-semibold">
                    {col.productCount}+ Products
                  </span>
                  <span className="text-xs font-semibold flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3" />
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
