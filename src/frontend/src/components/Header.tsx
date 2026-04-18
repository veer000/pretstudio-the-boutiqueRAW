import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { brands } from "../data/brands";
import { collections } from "../data/collections";

export default function Header() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/shop", search: { search: searchQuery } });
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const topBrands = brands.slice(0, 10);

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar text-white text-center text-xs sm:text-sm py-2 px-4">
        <span>
          🚚 Free Delivery on Orders Above Rs. 3,000 &nbsp;|&nbsp; 💰 COD
          Available Nationwide &nbsp;|&nbsp; 🔄 Easy Returns in 7 Days
        </span>
      </div>

      {/* Main Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 flex-shrink-0"
              data-ocid="nav.home.link"
            >
              <div className="flex flex-col">
                <span className="font-heading font-bold text-emerald-700 text-xl leading-none tracking-tight">
                  PretStudio
                </span>
                <span className="text-gold text-xs font-body font-medium tracking-[0.2em] uppercase">
                  The Boutique
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link
                to="/shop"
                className="text-foreground hover:text-emerald-700 transition-colors"
                data-ocid="nav.shop.link"
              >
                Shop All
              </Link>

              {/* Brands Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setBrandsOpen(true)}
                onMouseLeave={() => setBrandsOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-foreground hover:text-emerald-700 transition-colors"
                  data-ocid="nav.brands.link"
                >
                  Brands <ChevronDown className="w-4 h-4" />
                </button>
                {brandsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white shadow-lg border border-border rounded-lg p-4 w-64 grid grid-cols-2 gap-1 z-50">
                    {topBrands.map((b) => (
                      <Link
                        key={b.id}
                        to="/brands"
                        className="text-sm text-foreground hover:text-emerald-700 hover:bg-emerald-50 px-2 py-1.5 rounded transition-colors"
                        onClick={() => setBrandsOpen(false)}
                      >
                        {b.name}
                      </Link>
                    ))}
                    <Link
                      to="/brands"
                      className="col-span-2 text-center text-xs text-emerald-700 font-semibold mt-1 hover:underline"
                      onClick={() => setBrandsOpen(false)}
                    >
                      View All Brands →
                    </Link>
                  </div>
                )}
              </div>

              {/* Collections Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCollectionsOpen(true)}
                onMouseLeave={() => setCollectionsOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-foreground hover:text-emerald-700 transition-colors"
                >
                  Collections <ChevronDown className="w-4 h-4" />
                </button>
                {collectionsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white shadow-lg border border-border rounded-lg p-3 w-52 z-50">
                    {collections.map((c) => (
                      <Link
                        key={c.id}
                        to="/collections/$id"
                        params={{ id: c.id }}
                        className="block text-sm text-foreground hover:text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded transition-colors"
                        onClick={() => setCollectionsOpen(false)}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/blog"
                className="text-foreground hover:text-emerald-700 transition-colors"
              >
                Blog
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:text-emerald-700 transition-colors"
                data-ocid="nav.search.button"
                aria-label="Toggle search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/account"
                className="hidden sm:flex p-2 hover:text-emerald-700 transition-colors"
                aria-label="My Account"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>

              <Link
                to="/cart"
                className="relative p-2 hover:text-emerald-700 transition-colors"
                data-ocid="nav.cart.button"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-maroon text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                className="md:hidden p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                data-ocid="nav.menu.button"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="border-t border-border py-3">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search for brands, fabrics, collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
                <button
                  type="submit"
                  className="bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-800 transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2 hover:text-maroon transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
              <Link
                to="/"
                className="px-3 py-2.5 hover:bg-emerald-50 rounded-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="px-3 py-2.5 hover:bg-emerald-50 rounded-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Shop All
              </Link>
              <Link
                to="/brands"
                className="px-3 py-2.5 hover:bg-emerald-50 rounded-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Brands
              </Link>
              <Link
                to="/collections"
                className="px-3 py-2.5 hover:bg-emerald-50 rounded-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/blog"
                className="px-3 py-2.5 hover:bg-emerald-50 rounded-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/account"
                className="px-3 py-2.5 hover:bg-emerald-50 rounded-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                My Account
              </Link>
              <Link
                to="/contact"
                className="px-3 py-2.5 hover:bg-emerald-50 rounded-lg font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="mt-2 pt-2 border-t border-border">
                <Link
                  to="/cart"
                  className="flex items-center gap-2 px-3 py-2.5 bg-emerald-700 text-white rounded-lg font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  <ShoppingBag className="w-4 h-4" /> Cart{" "}
                  {cartCount > 0 && `(${cartCount})`}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
