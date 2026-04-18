import { Link } from "@tanstack/react-router";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-16 text-center max-w-md">
        <div className="mb-6">
          <span className="font-heading text-9xl font-bold text-emerald-100">
            404
          </span>
        </div>
        <span className="text-gold text-sm font-semibold tracking-widest uppercase">
          Page Not Found
        </span>
        <h1 className="font-heading text-3xl font-bold text-foreground mt-2 mb-3">
          Oops! This Page Doesn't Exist
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for may have been moved or doesn't exist.
          Let's get you back to shopping!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-50 font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            to="/shop"
            className="flex items-center justify-center gap-2 bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-800 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" /> Shop Now
          </Link>
        </div>
      </div>
    </main>
  );
}
