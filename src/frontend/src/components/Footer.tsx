import { Link } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-emerald-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <div className="mb-4">
              <span className="font-heading font-bold text-2xl text-white">
                PretStudio
              </span>
              <br />
              <span className="text-gold text-sm tracking-widest uppercase">
                The Boutique
              </span>
            </div>
            <p className="text-emerald-100 text-sm leading-relaxed mb-4">
              Pakistan's finest multi-brand ladies fashion destination. 50+
              premium brands, authentic products, nationwide delivery.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <span className="sr-only">TikTok</span>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.12a8.16 8.16 0 004.77 1.52V7.21a4.85 4.85 0 01-1-.52z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-gold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li>
                <Link to="/shop" className="hover:text-gold transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/brands"
                  className="hover:text-gold transition-colors"
                >
                  All Brands
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="hover:text-gold transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-gold transition-colors">
                  Fashion Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-gold">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li>
                <Link
                  to="/size-guide"
                  className="hover:text-gold transition-colors"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gold transition-colors"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gold transition-colors"
                >
                  Returns & Exchange
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gold transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gold transition-colors"
                >
                  Track My Order
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4 text-gold">
              Connect With Us
            </h4>
            <div className="space-y-3 text-sm text-emerald-100">
              <p>📍 Gulberg III, Lahore, Pakistan</p>
              <p>📞 +92 300 1234567</p>
              <p>✉️ hello@pretstudio.pk</p>
              <p>🕐 Mon–Sat: 10am – 8pm</p>
            </div>
            <div className="mt-4">
              <p className="text-xs text-emerald-300 mb-2">We Accept:</p>
              <div className="flex flex-wrap gap-2">
                {["COD", "JazzCash", "EasyPaisa", "Visa"].map((method) => (
                  <span
                    key={method}
                    className="text-xs bg-white/10 px-2 py-1 rounded border border-white/20"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <p className="text-xs text-emerald-300 mb-2">We Deliver Via:</p>
              <div className="flex flex-wrap gap-2">
                {["TCS", "Leopard", "Trax"].map((courier) => (
                  <span
                    key={courier}
                    className="text-xs bg-white/10 px-2 py-1 rounded border border-white/20"
                  >
                    {courier}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-700 py-4">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-emerald-300">
          <p>© {year} PretStudio The Boutique. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
