import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { collections } from "../data/collections";
import { products } from "../data/products";

export default function CollectionDetailPage() {
  const { id } = useParams({ strict: false });
  const collection = collections.find((c) => c.id === id);
  const collectionProducts = products.filter((p) => p.collection === id);
  const allProducts =
    collectionProducts.length > 0 ? collectionProducts : products.slice(0, 6);

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold">
          Collection not found
        </h2>
        <Link to="/collections" className="text-emerald-700 mt-4 inline-block">
          Back to Collections
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white container mx-auto">
          <Link
            to="/collections"
            className="flex items-center gap-1 text-white/70 hover:text-white text-sm mb-2 w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> All Collections
          </Link>
          {collection.badge && (
            <span className="bg-gold text-emerald-900 text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
              {collection.badge}
            </span>
          )}
          <h1 className="font-heading text-3xl sm:text-4xl font-bold">
            {collection.name}
          </h1>
          <p className="text-white/80 mt-1">{collection.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {allProducts.length} products in this collection
          </p>
          <Link
            to="/shop"
            className="text-emerald-700 text-sm font-semibold hover:underline"
          >
            View All Products
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
