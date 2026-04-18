import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CreditCard,
  RotateCcw,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { brands } from "../data/brands";
import { collections } from "../data/collections";
import { products } from "../data/products";

const brandNames = brands.map((b) => b.name);
const trendingProducts = products.slice(0, 4);
const featuredCollections = collections.slice(0, 6);

const testimonials = [
  {
    name: "Ayesha R.",
    city: "Lahore",
    rating: 5,
    text: "Absolutely love PretStudio! The Maria B suit I ordered was authentic and arrived in perfect condition. Fast delivery too!",
  },
  {
    name: "Sana K.",
    city: "Karachi",
    rating: 5,
    text: "Finally a trustworthy place to buy branded Pakistani fashion online. The size guide is super helpful and the quality is amazing.",
  },
  {
    name: "Fatima M.",
    city: "Islamabad",
    rating: 5,
    text: "Ordered an Asim Jofa chiffon for my sister's wedding. It was stunning! COD option made it so convenient. Will definitely order again!",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-[480px] sm:h-[540px] md:h-[580px]">
          <img
            src="/assets/generated/hero-banner.dim_1400x600.jpg"
            alt="PretStudio The Boutique"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 via-emerald-800/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl">
                <span className="inline-block text-gold text-sm font-body font-semibold tracking-widest uppercase mb-3">
                  Pakistan's Finest Boutique
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                  Pakistan's Finest
                  <em className="block text-gold not-italic">Ladies Fashion</em>
                </h1>
                <p className="text-emerald-100 text-base sm:text-lg mb-8 leading-relaxed">
                  50+ Premium Brands. Authentic Products. Nationwide Delivery.
                  Discover your perfect Shalwar Qameez.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-emerald-900 font-body font-bold px-7 py-3.5 rounded-full transition-all hover:shadow-gold"
                    data-ocid="home.hero.shop_button"
                  >
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/collections"
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-body font-semibold px-7 py-3.5 rounded-full hover:bg-white/20 transition-all"
                  >
                    Browse Collections
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Curated For You
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Shop by Collection
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredCollections.map((col) => (
              <Link
                key={col.id}
                to="/collections/$id"
                params={{ id: col.id }}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4]"
              >
                <img
                  src={col.image}
                  alt={col.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {col.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-gold text-emerald-900 text-xs font-bold px-3 py-1 rounded-full">
                      {col.badge}
                    </span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-heading font-bold text-lg leading-tight">
                    {col.name}
                  </h3>
                  <p className="text-xs text-white/80 mt-0.5">
                    {col.productCount}+ Products
                  </p>
                  <div className="mt-2 text-xs font-semibold text-gold flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                What's Hot
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-1">
                Trending Now
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-emerald-700 font-semibold text-sm hover:underline flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <section className="py-10 bg-emerald-50 border-y border-emerald-100 overflow-hidden">
        <div className="mb-4 text-center">
          <span className="text-emerald-700 text-sm font-semibold tracking-widest uppercase">
            Our Premium Brands
          </span>
        </div>
        <div className="relative flex overflow-hidden">
          <div className="brand-marquee flex gap-4 min-w-max">
            {[...brandNames, ...brandNames].map((name, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: marquee duplicate names need index
                key={i}
                className="flex-shrink-0 bg-white text-emerald-800 font-body font-semibold text-sm px-5 py-2.5 rounded-full border border-emerald-200 shadow-xs hover:border-gold hover:text-gold transition-colors cursor-pointer whitespace-nowrap"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Why PretStudio?
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              Shop With Confidence
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <CreditCard className="w-8 h-8" />,
                title: "Cash on Delivery",
                desc: "Pay when you receive. No advance payment required.",
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Fast Delivery",
                desc: "2-5 working days delivery across Pakistan.",
              },
              {
                icon: <RotateCcw className="w-8 h-8" />,
                title: "Easy Returns",
                desc: "7-day hassle-free return and exchange policy.",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "100% Authentic",
                desc: "All products are sourced directly from brands.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-2xl bg-beige hover:bg-emerald-50 transition-colors group"
              >
                <div className="w-16 h-16 bg-emerald-100 group-hover:bg-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4 text-emerald-700 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Happy Customers
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 shadow-card"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, starIdx) => (
                    <Star // biome-ignore lint/suspicious/noArrayIndexKey: star rating
                      key={starIdx}
                      className="w-4 h-4 text-gold fill-gold"
                    />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Stay Updated
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 mb-3">
            Get Exclusive Deals & New Arrivals
          </h2>
          <p className="text-emerald-100 mb-8 max-w-md mx-auto">
            Subscribe to our newsletter and be the first to know about new
            collections, exclusive discounts, and fashion tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              data-ocid="home.newsletter.input"
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-dark text-emerald-900 font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
              data-ocid="home.newsletter.submit_button"
              onClick={(e) => e.preventDefault()}
            >
              Subscribe
            </button>
          </form>
          <p className="text-emerald-300 text-xs mt-3">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </main>
  );
}
