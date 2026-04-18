import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { brands } from "../data/brands";

export default function BrandsPage() {
  return (
    <main className="min-h-screen">
      <div className="bg-emerald-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            All Partners
          </span>
          <h1 className="font-heading text-4xl font-bold mt-2">
            Our Premium Brands
          </h1>
          <p className="text-emerald-100 mt-2">
            15+ authentic Pakistani fashion brands under one roof
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {brands.map((brand, i) => (
            <div
              key={brand.id}
              className="bg-white rounded-2xl p-6 border border-border hover:border-emerald-300 hover:shadow-emerald transition-all group"
              data-ocid={`brands.item.${i + 1}`}
            >
              <div className="mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 font-heading font-bold text-xl mb-3">
                  {brand.name[0]}
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  {brand.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Est. {brand.founded} &bull; {brand.origin}
                </p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                {brand.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-semibold">
                  {brand.productCount}+ Products
                </span>
                <Link
                  to="/shop"
                  className="text-xs text-emerald-700 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  View Collection <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
