import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

const SHIPPING_FREE_THRESHOLD = 3000;
const SHIPPING_COST = 200;

export default function CartPage() {
  const { items, removeFromCart, updateQty, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const shipping = cartTotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_COST;
  const total = cartTotal - discount + shipping;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "PRET10") {
      const d = Math.round(cartTotal * 0.1);
      setDiscount(d);
      toast.success(`Promo applied! You saved Rs. ${d.toLocaleString()}`);
    } else {
      toast.error("Invalid promo code");
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <div
          className="container mx-auto px-4 py-20 text-center"
          data-ocid="cart.empty_state"
        >
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-emerald-700" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
            Your Cart is Empty
          </h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added anything yet. Let's find something
            beautiful!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-800 transition-colors"
          >
            Continue Shopping <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-emerald-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold">Shopping Cart</h1>
          <p className="text-emerald-100 text-sm mt-1">
            {items.length} item{items.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="bg-white rounded-2xl p-4 border border-border flex gap-4"
                data-ocid={`cart.item.${i + 1}`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-28 object-cover rounded-xl flex-shrink-0 bg-beige-dark"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-emerald-700 font-semibold uppercase">
                        {item.brand}
                      </p>
                      <h3 className="font-body font-semibold text-foreground line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          Size: {item.size}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                          Color: {item.color}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        removeFromCart(item.productId, item.size, item.color)
                      }
                      className="text-muted-foreground hover:text-maroon transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border border-border rounded-lg">
                      <button
                        type="button"
                        onClick={() =>
                          updateQty(
                            item.productId,
                            item.size,
                            item.color,
                            item.qty - 1,
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-l-lg"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQty(
                            item.productId,
                            item.size,
                            item.color,
                            item.qty + 1,
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors rounded-r-lg"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-foreground">
                      Rs. {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl border border-border p-6 sticky top-24">
              <h3 className="font-heading font-bold text-lg mb-4">
                Order Summary
              </h3>

              {/* Promo Code */}
              <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-emerald-600"
                    data-ocid="cart.promo.input"
                  />
                </div>
                <button
                  type="button"
                  onClick={applyPromo}
                  className="bg-emerald-700 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-800 transition-colors"
                >
                  Apply
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Try code <strong>PRET10</strong> for 10% off!
              </p>

              <div className="space-y-2 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span
                    className={
                      shipping === 0 ? "text-green-600 font-semibold" : ""
                    }
                  >
                    {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add Rs.{" "}
                    {(SHIPPING_FREE_THRESHOLD - cartTotal).toLocaleString()}{" "}
                    more for free shipping!
                  </p>
                )}
                <div className="flex justify-between font-bold text-lg border-t border-border pt-2 mt-2">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full mt-5 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition-colors"
                data-ocid="cart.checkout.button"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop"
                className="block text-center text-sm text-emerald-700 hover:underline mt-3"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
