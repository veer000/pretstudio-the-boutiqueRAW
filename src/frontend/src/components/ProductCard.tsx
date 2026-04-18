import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/products";

const STARS = [1, 2, 3, 4, 5];

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useCart();
  const inWishlist = isInWishlist(product.id);

  const discount =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: product.sizes[2] || product.sizes[0],
      color: product.colors[0],
      qty: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist(product.id);
      toast.success("Added to wishlist!");
    }
  };

  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block bg-white rounded-xl overflow-hidden product-card-hover border border-border"
      data-ocid={`shop.product.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative aspect-[5/6] overflow-hidden bg-beige-dark">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-emerald-700 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              NEW
            </span>
          )}
          {discount > 0 && (
            <span className="bg-maroon text-white text-xs px-2 py-0.5 rounded-full font-semibold">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label="Toggle wishlist"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            inWishlist
              ? "bg-maroon text-white"
              : "bg-white/80 text-muted-foreground hover:bg-white hover:text-maroon"
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
        </button>

        {/* Quick Add */}
        <div className="absolute bottom-0 left-0 right-0 bg-emerald-700 text-white text-sm font-semibold py-2.5 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 w-full"
          >
            <ShoppingBag className="w-4 h-4" /> Quick Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide mb-0.5">
          {product.brand}
        </p>
        <h3 className="font-body font-semibold text-sm text-foreground line-clamp-1 mb-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {STARS.map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${star <= Math.floor(product.rating) ? "text-gold fill-gold" : "text-muted-foreground"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
