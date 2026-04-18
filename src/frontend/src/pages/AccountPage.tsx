import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import { Heart, LogOut, MapPin, Package, User } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";

const MOCK_ORDERS = [
  {
    id: "PS-2026-48291",
    date: "March 8, 2026",
    status: "Delivered",
    total: 6500,
    items: 2,
  },
  {
    id: "PS-2026-39102",
    date: "February 20, 2026",
    status: "Shipped",
    total: 4200,
    items: 1,
  },
  {
    id: "PS-2026-28430",
    date: "February 5, 2026",
    status: "Delivered",
    total: 11500,
    items: 3,
  },
];

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("pretstudio_loggedin") === "true",
  );
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const { wishlist } = useCart();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("pretstudio_loggedin", "true");
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("pretstudio_loggedin", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("pretstudio_loggedin");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-background">
        <div className="bg-emerald-800 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-heading text-3xl font-bold">My Account</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12 max-w-md">
          <Tabs defaultValue="login">
            <TabsList className="w-full">
              <TabsTrigger value="login" className="flex-1">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1">
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <div className="bg-white rounded-2xl p-6 border border-border mt-4">
                <h2 className="font-heading font-bold text-xl mb-5">
                  Welcome Back!
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="fatima@example.com"
                      className="mt-1"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="mt-1"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800"
                    data-ocid="account.login.button"
                  >
                    Login to My Account
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="register">
              <div className="bg-white rounded-2xl p-6 border border-border mt-4">
                <h2 className="font-heading font-bold text-xl mb-5">
                  Create Account
                </h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      placeholder="Fatima Ahmed"
                      className="mt-1"
                      value={regData.name}
                      onChange={(e) =>
                        setRegData({ ...regData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="fatima@example.com"
                      className="mt-1"
                      value={regData.email}
                      onChange={(e) =>
                        setRegData({ ...regData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      placeholder="03001234567"
                      className="mt-1"
                      value={regData.phone}
                      onChange={(e) =>
                        setRegData({ ...regData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="mt-1"
                      value={regData.password}
                      onChange={(e) =>
                        setRegData({ ...regData, password: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800"
                    data-ocid="account.register.button"
                  >
                    Create Account
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="bg-emerald-800 text-white py-8">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">My Account</h1>
            <p className="text-emerald-100 text-sm mt-1">
              Welcome back, Fatima!
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-emerald-100 hover:text-white text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="orders">
          <TabsList className="mb-6">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" /> Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Addresses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="space-y-4">
              {MOCK_ORDERS.map((order, i) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl p-5 border border-border"
                  data-ocid={`account.orders.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-foreground">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.date} &bull; {order.items} items
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                      <p className="font-bold mt-1">
                        Rs. {order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            {wishlistProducts.length === 0 ? (
              <div
                className="text-center py-12"
                data-ocid="account.wishlist.empty_state"
              >
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">
                  Your wishlist is empty
                </p>
                <Link
                  to="/shop"
                  className="bg-emerald-700 text-white px-6 py-2 rounded-lg text-sm"
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {wishlistProducts.map((p, _i) => (
                  <Link
                    key={p.id}
                    to="/product/$id"
                    params={{ id: p.id }}
                    className="bg-white rounded-xl overflow-hidden border border-border"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full aspect-[4/5] object-cover"
                    />
                    <div className="p-3">
                      <p className="text-xs text-emerald-700 font-semibold">
                        {p.brand}
                      </p>
                      <p className="text-sm font-semibold line-clamp-1">
                        {p.name}
                      </p>
                      <p className="font-bold text-sm mt-1">
                        Rs. {p.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <div className="bg-white rounded-2xl p-6 border border-border max-w-lg">
              <h3 className="font-heading font-bold text-lg mb-5">
                Profile Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input defaultValue="Fatima Ahmed" className="mt-1" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input defaultValue="fatima@example.com" className="mt-1" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input defaultValue="03001234567" className="mt-1" />
                </div>
                <Button className="bg-emerald-700 hover:bg-emerald-800">
                  Save Changes
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="addresses">
            <div className="bg-white rounded-2xl p-6 border border-border max-w-lg">
              <h3 className="font-heading font-bold text-lg mb-5">
                Saved Addresses
              </h3>
              <div className="bg-beige rounded-xl p-4 mb-4">
                <p className="font-semibold text-sm">Home</p>
                <p className="text-sm text-muted-foreground mt-1">
                  23 Gulberg III, Main Boulevard, Lahore, Punjab
                </p>
                <p className="text-xs text-emerald-700 font-semibold mt-2 cursor-pointer hover:underline">
                  Edit Address
                </p>
              </div>
              <button
                type="button"
                className="text-sm text-emerald-700 font-semibold hover:underline"
              >
                + Add New Address
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
