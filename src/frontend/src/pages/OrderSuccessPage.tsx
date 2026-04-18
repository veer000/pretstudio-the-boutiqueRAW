import { Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, ShoppingBag } from "lucide-react";

const orderNumber = `PS-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000}`;

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-background flex items-center">
      <div className="container mx-auto px-4 py-16 text-center max-w-lg">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-14 h-14 text-emerald-600" />
        </div>
        <span className="text-gold text-sm font-semibold tracking-widest uppercase">
          Order Confirmed!
        </span>
        <h1 className="font-heading text-4xl font-bold text-foreground mt-2 mb-3">
          Thank You for Your Order!
        </h1>
        <p className="text-muted-foreground mb-3">
          We've received your order and are preparing it with care. You'll
          receive a confirmation SMS shortly.
        </p>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-6">
          <p className="text-sm text-muted-foreground">Your Order Number</p>
          <p className="font-heading font-bold text-2xl text-emerald-700 mt-1">
            {orderNumber}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Save this number for order tracking
          </p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-5 mb-8 text-left space-y-2 text-sm">
          <h3 className="font-semibold text-foreground mb-2">
            What happens next?
          </h3>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-xs text-emerald-700 font-bold flex-shrink-0 mt-0.5">
              1
            </span>
            <p className="text-muted-foreground">
              Order confirmation SMS sent to your phone
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-xs text-emerald-700 font-bold flex-shrink-0 mt-0.5">
              2
            </span>
            <p className="text-muted-foreground">
              Order packed and dispatched within 24-48 hours
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center text-xs text-emerald-700 font-bold flex-shrink-0 mt-0.5">
              3
            </span>
            <p className="text-muted-foreground">
              Delivery in 2-5 business days via TCS/Leopard
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/923001234567?text=Hi! I want to track my order ${orderNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-green-500 text-green-600 hover:bg-green-50 font-semibold py-3 rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Track on WhatsApp
          </a>
          <Link
            to="/shop"
            className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 text-white font-bold py-3 rounded-xl hover:bg-emerald-800 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
