import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const CITIES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Gujranwala",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Hyderabad",
  "Abbottabad",
];
const PROVINCES = [
  "Punjab",
  "Sindh",
  "KPK",
  "Balochistan",
  "Gilgit-Baltistan",
  "AJK",
];

const PAYMENT_METHODS = [
  {
    id: "cod",
    label: "Cash on Delivery",
    desc: "Pay when you receive your order",
    icon: "💵",
  },
  {
    id: "jazzcash",
    label: "JazzCash",
    desc: "Pay via JazzCash mobile account",
    icon: "📱",
  },
  {
    id: "easypaisa",
    label: "EasyPaisa",
    desc: "Pay via EasyPaisa mobile account",
    icon: "💳",
  },
  {
    id: "card",
    label: "Credit/Debit Card",
    desc: "Visa, Mastercard accepted",
    icon: "💳",
  },
  {
    id: "bank",
    label: "Bank Transfer",
    desc: "Direct bank transfer",
    icon: "🏦",
  },
];

const steps = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    province: "",
  });

  const shipping = cartTotal >= 3000 ? 0 : 200;
  const total = cartTotal + shipping;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePlaceOrder = () => {
    clearCart();
    navigate({ to: "/checkout/success" });
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold mb-4">
          Your cart is empty
        </h2>
        <Link to="/shop" className="text-emerald-700 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-emerald-800 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-bold">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex items-center gap-2 ${i + 1 < step ? "text-emerald-700" : i + 1 === step ? "text-emerald-700" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                    i + 1 < step
                      ? "bg-emerald-700 border-emerald-700 text-white"
                      : i + 1 === step
                        ? "border-emerald-700 text-emerald-700"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className="font-semibold text-sm hidden sm:inline">
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-12 sm:w-20 h-0.5 mx-2 ${i + 1 < step ? "bg-emerald-700" : "bg-border"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-2">
            {/* Step 1 - Shipping */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h2 className="font-heading font-bold text-xl mb-5">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name *</Label>
                    <Input
                      placeholder="Fatima Ahmed"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Phone Number *</Label>
                    <Input
                      placeholder="03001234567"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Email Address</Label>
                    <Input
                      placeholder="fatima@example.com"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label>Delivery Address *</Label>
                    <Input
                      placeholder="House No, Street, Area"
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>City *</Label>
                    <Select
                      onValueChange={(v) => setForm({ ...form, city: v })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {CITIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Province *</Label>
                    <Select
                      onValueChange={(v) => setForm({ ...form, province: v })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {PROVINCES.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2 - Payment */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h2 className="font-heading font-bold text-xl mb-5">
                  Payment Method
                </h2>
                <div className="space-y-3" data-ocid="checkout.payment.select">
                  {PAYMENT_METHODS.map((method) => (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === method.id
                          ? "border-emerald-700 bg-emerald-50"
                          : "border-border hover:border-emerald-300"
                      }`}
                    >
                      <span className="text-2xl">{method.icon}</span>
                      <div className="text-left">
                        <p className="font-semibold text-sm">{method.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {method.desc}
                        </p>
                      </div>
                      {paymentMethod === method.id && (
                        <div className="ml-auto w-5 h-5 bg-emerald-700 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3 - Review */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 border border-border">
                <h2 className="font-heading font-bold text-xl mb-5">
                  Review Your Order
                </h2>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-3 py-3 border-b border-border"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.brand} | {item.size} | {item.color}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.qty}
                        </p>
                      </div>
                      <span className="font-bold text-sm">
                        Rs. {(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-emerald-50 rounded-xl p-4 text-sm">
                  <p>
                    <strong>Name:</strong> {form.name || "—"}
                  </p>
                  <p>
                    <strong>Phone:</strong> {form.phone || "—"}
                  </p>
                  <p>
                    <strong>Address:</strong> {form.address || "—"},{" "}
                    {form.city || "—"}
                  </p>
                  <p>
                    <strong>Payment:</strong>{" "}
                    {PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-6 py-3 border border-border rounded-xl font-semibold hover:border-emerald-700 transition-colors"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 text-white font-bold py-3 rounded-xl hover:bg-emerald-800 transition-colors"
                  data-ocid="checkout.next.button"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-800 transition-colors"
                  data-ocid="checkout.place_order.button"
                >
                  Place Order
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="bg-white rounded-2xl border border-border p-5 sticky top-24">
              <h3 className="font-heading font-bold text-base mb-4">
                Order Summary
              </h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({items.length} items)
                  </span>
                  <span>Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base border-t border-border pt-2 mt-2">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
