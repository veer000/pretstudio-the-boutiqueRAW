import { Link } from "@tanstack/react-router";

const stats = [
  { value: "15+", label: "Premium Brands" },
  { value: "1,000+", label: "Products" },
  { value: "50K+", label: "Happy Customers" },
  { value: "Free", label: "COD Available" },
];

const team = [
  { name: "Zara Malik", role: "Founder & CEO", initials: "ZM" },
  { name: "Ayesha Siddiqui", role: "Head of Curation", initials: "AS" },
  { name: "Nida Baig", role: "Brand Relations", initials: "NB" },
  { name: "Sana Tariq", role: "Customer Experience", initials: "ST" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src="/assets/generated/about-boutique.dim_800x500.jpg"
          alt="PretStudio Boutique"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Our Story
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold mt-2">
              About PretStudio
            </h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-gold text-sm font-semibold tracking-widest uppercase">
                Est. 2024
              </span>
              <h2 className="font-heading text-3xl font-bold mt-2 mb-4">
                Pakistan's Premier Fashion Destination
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                PretStudio The Boutique was born out of a simple frustration:
                Pakistani women deserve a trustworthy, convenient place to shop
                authentic branded fashion online. No more counterfeit products,
                no more size surprises, no more crowded markets.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in Lahore in 2024, we've partnered with 15+ of
                Pakistan's most beloved and respected fashion brands to bring
                their authentic collections to your doorstep. From the vibrant
                prints of Khaadi to the luxury embroideries of Maria B — it's
                all here, curated with love.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is simple: make authentic Pakistani fashion
                accessible to every woman, from Lahore to Gwadar, with the trust
                and convenience you deserve.
              </p>
            </div>
            <div className="bg-beige rounded-2xl p-8 text-center">
              <blockquote className="font-heading text-xl italic text-foreground leading-relaxed mb-4">
                "Every Pakistani woman deserves to feel beautiful in authentic,
                quality fashion — delivered right to her door."
              </blockquote>
              <p className="text-gold font-semibold">— Zara Malik, Founder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-emerald-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-4xl font-bold text-gold">
                  {stat.value}
                </p>
                <p className="text-emerald-100 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-beige">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              The People
            </span>
            <h2 className="font-heading text-3xl font-bold mt-2">
              Meet Our Team
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 bg-emerald-700 rounded-full flex items-center justify-center text-white font-heading font-bold text-xl mx-auto mb-3">
                  {member.initials}
                </div>
                <h3 className="font-body font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-gold text-sm font-semibold tracking-widest uppercase">
              Our Promise
            </span>
            <h2 className="font-heading text-3xl font-bold mt-2">
              Why Shop With PretStudio?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                emoji: "✅",
                title: "100% Authentic Products",
                desc: "Every product is sourced directly from official brand distributors. No replicas, ever.",
              },
              {
                emoji: "🚚",
                title: "Nationwide Delivery",
                desc: "We deliver to all major cities and towns across Pakistan via TCS, Leopard, and Trax.",
              },
              {
                emoji: "💵",
                title: "Cash on Delivery",
                desc: "No need to pay in advance. Pay when you receive your order at your doorstep.",
              },
              {
                emoji: "🔄",
                title: "7-Day Easy Returns",
                desc: "Not happy? Return or exchange within 7 days with our hassle-free policy.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 bg-beige rounded-2xl"
              >
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <h3 className="font-body font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-emerald-800 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Ready to Shop Authentically?
          </h2>
          <Link
            to="/shop"
            className="inline-block bg-gold text-emerald-900 font-bold px-8 py-3.5 rounded-full hover:bg-gold-dark transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}
