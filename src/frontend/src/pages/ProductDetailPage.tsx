import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Heart,
  MessageCircle,
  ShoppingBag,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

const sizeGuideData = [
  { size: "XS", chest: "32", waist: "26", hips: "34", length: "52" },
  { size: "S", chest: "34", waist: "28", hips: "36", length: "53" },
  { size: "M", chest: "36", waist: "30", hips: "38", length: "54" },
  { size: "L", chest: "38", waist: "32", hips: "40", length: "55" },
  { size: "XL", chest: "40", waist: "34", hips: "42", length: "56" },
  { size: "XXL", chest: "42", waist: "36", hips: "44", length: "57" },
  { size: "3XL", chest: "44", waist: "38", hips: "46", length: "58" },
];

export default function ProductDetailPage() {
  const { id } = useParams({ strict: false });
  const product = products.find((p) => p.id === id);
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useCart();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold">Product not found</h2>
        <Link to="/shop" className="text-emerald-700 mt-4 inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discount =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  const relatedProducts = products
    .filter((p) => p.id !== id && p.collection === product.collection)
    .slice(0, 4);
  const fallbackRelated = products.filter((p) => p.id !== id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    addToCart({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      qty,
    });
    setAddedToCart(true);
    toast.success(`${product.name} added to cart!`);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.info("Removed from wishlist");
    } else {
      addToWishlist(product.id);
      toast.success("Added to wishlist!");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-emerald-700">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-emerald-700">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div>
            <div className="aspect-[5/6] rounded-2xl overflow-hidden bg-beige-dark mb-3">
              <img
                src={product.images[mainImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  type="button"
                  key={img}
                  onClick={() => setMainImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    mainImage === i
                      ? "border-emerald-700"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-emerald-700 font-semibold text-sm uppercase tracking-wide">
                  {product.brand}
                </span>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mt-1 leading-tight">
                  {product.name}
                </h1>
              </div>
              <button
                type="button"
                onClick={handleWishlist}
                className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                  inWishlist
                    ? "bg-maroon border-maroon text-white"
                    : "border-border hover:border-maroon"
                }`}
                data-ocid="product.wishlist.button"
              >
                <Heart
                  className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`}
                />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= Math.floor(product.rating) ? "text-gold fill-gold" : "text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-foreground">
                Rs. {product.price.toLocaleString()}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-maroon text-white text-sm font-bold px-2 py-0.5 rounded">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {product.cutline && (
              <p className="mt-3 text-sm text-muted-foreground font-medium">
                <span className="text-emerald-700 font-semibold">Cutline:</span>{" "}
                {product.cutline}
              </p>
            )}

            <div className="mt-2 flex gap-2">
              <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                {product.fabric}
              </span>
              <span className="text-xs bg-beige-dark text-foreground px-3 py-1 rounded-full">
                {product.occasion}
              </span>
              {product.inStock ? (
                <span className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" /> In Stock
                </span>
              ) : (
                <span className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Size Select */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">Size</span>
                <Dialog>
                  <DialogTrigger className="text-xs text-emerald-700 underline">
                    Size Guide
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Size Guide</DialogTitle>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-emerald-50">
                            <th className="px-4 py-2 text-left">Size</th>
                            <th className="px-4 py-2">Chest (in)</th>
                            <th className="px-4 py-2">Waist (in)</th>
                            <th className="px-4 py-2">Hips (in)</th>
                            <th className="px-4 py-2">Length (in)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeGuideData.map((row) => (
                            <tr
                              key={row.size}
                              className="border-t border-border"
                            >
                              <td className="px-4 py-2 font-bold text-emerald-700">
                                {row.size}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {row.chest}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {row.waist}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {row.hips}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {row.length}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div
                className="flex flex-wrap gap-2"
                data-ocid="product.size.select"
              >
                {product.sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "bg-emerald-700 text-white border-emerald-700"
                        : "border-border hover:border-emerald-600"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Select */}
            <div className="mt-5">
              <span className="font-semibold text-sm block mb-2">
                Color:{" "}
                {selectedColor && (
                  <span className="font-normal text-muted-foreground">
                    {selectedColor}
                  </span>
                )}
              </span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    type="button"
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      selectedColor === color
                        ? "bg-emerald-700 text-white border-emerald-700"
                        : "border-border hover:border-emerald-600"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-5">
              <span className="font-semibold text-sm block mb-2">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 rounded-lg border border-border hover:border-emerald-700 flex items-center justify-center text-lg font-bold transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                  className="w-16 text-center border border-border rounded-lg py-1.5 text-sm"
                  data-ocid="product.qty.input"
                />
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 rounded-lg border border-border hover:border-emerald-700 flex items-center justify-center text-lg font-bold transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition-all"
                data-ocid="product.add_cart.button"
              >
                {addedToCart ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ShoppingBag className="w-4 h-4" />
                )}
                {addedToCart ? "Added!" : "Add to Cart"}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!selectedSize) {
                    toast.error("Please select a size");
                    return;
                  }
                  if (!selectedColor) {
                    toast.error("Please select a color");
                    return;
                  }
                  handleAddToCart();
                  navigate({ to: "/cart" });
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-emerald-900 font-bold py-3.5 rounded-xl transition-all shadow-gold"
                data-ocid="product.buy_now.button"
              >
                <Zap className="w-4 h-4" /> Buy Now
              </button>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/923001234567?text=Hi! I'm interested in: ${product.name} by ${product.brand}. Price: Rs. ${product.price.toLocaleString()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold py-3 rounded-xl transition-colors w-full"
            >
              <MessageCircle className="w-4 h-4" /> Inquire on WhatsApp
            </a>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="bg-beige-dark">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="care">Fabric & Care</TabsTrigger>
              <TabsTrigger value="size-guide">Size Guide</TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="description"
              className="mt-4 prose prose-sm max-w-none"
            >
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              <ul className="mt-4 space-y-1 text-sm">
                <li>
                  <strong>Brand:</strong> {product.brand}
                </li>
                <li>
                  <strong>Fabric:</strong> {product.fabric}
                </li>
                <li>
                  <strong>Occasion:</strong> {product.occasion}
                </li>
                <li>
                  <strong>Available Sizes:</strong> {product.sizes.join(", ")}
                </li>
                <li>
                  <strong>Available Colors:</strong> {product.colors.join(", ")}
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="care" className="mt-4">
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Washing:</strong> Hand
                  wash in cold water with mild detergent. First wash separately.
                </p>
                <p>
                  <strong className="text-foreground">Drying:</strong> Dry in
                  shade. Do not wring. Lay flat to dry.
                </p>
                <p>
                  <strong className="text-foreground">Ironing:</strong> Iron on
                  medium heat from reverse side. Use a pressing cloth for
                  embroidered areas.
                </p>
                <p>
                  <strong className="text-foreground">Storage:</strong> Store
                  folded in a cool, dry place. Use cedar blocks to prevent
                  moths.
                </p>
                <p>
                  <strong className="text-foreground">Dry Clean:</strong>{" "}
                  Recommended for heavy embroidered pieces.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="size-guide" className="mt-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="px-4 py-3 text-left font-semibold">
                        Size
                      </th>
                      <th className="px-4 py-3 font-semibold">Chest (in)</th>
                      <th className="px-4 py-3 font-semibold">Waist (in)</th>
                      <th className="px-4 py-3 font-semibold">Hips (in)</th>
                      <th className="px-4 py-3 font-semibold">Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuideData.map((row, i) => (
                      <tr
                        key={row.size}
                        className={i % 2 === 0 ? "bg-white" : "bg-beige"}
                      >
                        <td className="px-4 py-2.5 font-bold text-emerald-700">
                          {row.size}
                        </td>
                        <td className="px-4 py-2.5 text-center">{row.chest}</td>
                        <td className="px-4 py-2.5 text-center">{row.waist}</td>
                        <td className="px-4 py-2.5 text-center">{row.hips}</td>
                        <td className="px-4 py-2.5 text-center">
                          {row.length}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                {[
                  {
                    name: "Amna S.",
                    rating: 5,
                    text: "Beautiful quality! The embroidery is exactly as shown. Very happy with the purchase.",
                    date: "Feb 15, 2026",
                  },
                  {
                    name: "Sara K.",
                    rating: 4,
                    text: "Lovely fabric and perfect stitching. Delivery was fast. Size runs slightly large.",
                    date: "Jan 28, 2026",
                  },
                  {
                    name: "Hina M.",
                    rating: 5,
                    text: "Ordered for Eid and it was perfect. Got so many compliments!",
                    date: "Jan 10, 2026",
                  },
                ].map((review) => (
                  <div key={review.name} className="bg-beige rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-xs">
                        {review.name[0]}
                      </div>
                      <span className="font-semibold text-sm">
                        {review.name}
                      </span>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, rIdx) => (
                          <Star
                            // biome-ignore lint/suspicious/noArrayIndexKey: static star rating display
                            key={rIdx}
                            className="w-3 h-3 text-gold fill-gold"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-auto">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {(relatedProducts.length > 0 || fallbackRelated.length > 0) && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(relatedProducts.length > 0
                ? relatedProducts
                : fallbackRelated
              ).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
