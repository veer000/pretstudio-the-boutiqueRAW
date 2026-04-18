import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent! We'll respond within 24 hours.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main className="min-h-screen">
      <div className="bg-emerald-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <span className="text-gold text-sm font-semibold tracking-widest uppercase">
            Get in Touch
          </span>
          <h1 className="font-heading text-4xl font-bold mt-2">Contact Us</h1>
          <p className="text-emerald-100 mt-2">
            We're here to help — reach out anytime!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-6 border border-border">
            <h2 className="font-heading font-bold text-xl mb-5">
              Send Us a Message
            </h2>
            {sent ? (
              <div
                className="text-center py-10"
                data-ocid="contact.form.success_state"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We'll respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-4 text-emerald-700 hover:underline text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Your Name *</Label>
                  <Input
                    placeholder="Fatima Ahmed"
                    className="mt-1"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Email Address *</Label>
                  <Input
                    type="email"
                    placeholder="fatima@example.com"
                    className="mt-1"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    placeholder="03001234567"
                    className="mt-1"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Message *</Label>
                  <Textarea
                    placeholder="How can we help you?"
                    rows={5}
                    className="mt-1 resize-none"
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    data-ocid="contact.form.textarea"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800"
                  data-ocid="contact.form.submit_button"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-5 border border-border">
              <h3 className="font-heading font-bold text-lg mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Our Office</p>
                    <p className="text-sm text-muted-foreground">
                      Gulberg III, Main Boulevard, Lahore, Punjab, Pakistan
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Phone / WhatsApp</p>
                    <a
                      href="tel:+923001234567"
                      className="text-sm text-emerald-700 hover:underline"
                    >
                      +92 300 1234567
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <a
                      href="mailto:hello@pretstudio.pk"
                      className="text-sm text-emerald-700 hover:underline"
                    >
                      hello@pretstudio.pk
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl p-5 transition-colors"
            >
              <MessageCircle className="w-8 h-8 flex-shrink-0" />
              <div>
                <p className="font-bold">Chat on WhatsApp</p>
                <p className="text-sm text-green-100">
                  Get instant response in minutes
                </p>
              </div>
            </a>

            {/* Social Links */}
            <div className="bg-white rounded-2xl p-5 border border-border">
              <h3 className="font-heading font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-semibold hover:bg-pink-50 hover:border-pink-300 hover:text-pink-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-semibold hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
              <h3 className="font-semibold text-emerald-800 mb-2">
                🕐 Business Hours
              </h3>
              <p className="text-sm text-emerald-700">
                Monday to Saturday: 10:00 AM – 8:00 PM
              </p>
              <p className="text-sm text-emerald-700">
                Sunday: 12:00 PM – 6:00 PM
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                WhatsApp support available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
