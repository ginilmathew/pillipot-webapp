import Link from "next/link";
import {
  Globe,
  MessageCircle,
  Play,
  Camera,
  Mail,
  Phone,
  ShieldCheck,
  CreditCard,
  Truck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const sections = [
  {
    title: "Explore",
    links: ["All Categories", "Trending Now", "Fresh Drops", "Best Deals", "Gift Picks"],
  },
  {
    title: "Support",
    links: ["Help Center", "Track Order", "Returns", "Shipping Info", "FAQs"],
  },
  {
    title: "Company",
    links: ["About Pillipot", "Careers", "Press", "Sustainability", "Partners"],
  },
  {
    title: "Policies",
    links: ["Terms", "Privacy", "Cookie Policy", "Accessibility", "Seller Policy"],
  },
];

const trustPoints = [
  { icon: ShieldCheck, title: "Verified products", note: "Trusted catalog and secure orders" },
  { icon: CreditCard, title: "Protected checkout", note: "Encrypted payments and support" },
  { icon: Truck, title: "Fast delivery", note: "Reliable shipping across regions" },
];

export default function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-slate-200/70 bg-[#081120] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(31,111,255,0.26),transparent_26%),radial-gradient(circle_at_top_right,rgba(255,190,92,0.16),transparent_16%)]" />

      <div className="pp-container relative py-8 md:py-10">
        <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/6 p-4 backdrop-blur-xl md:grid-cols-3 md:p-6">
          {trustPoints.map((item) => (
            <div key={item.title} className="flex items-start gap-4 rounded-[1.5rem] border border-white/8 bg-white/6 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{item.title}</p>
                <p className="mt-1 text-sm text-white/60">{item.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="pp-chip border-white/10 bg-white/8 text-white/86">
                <Sparkles className="h-3.5 w-3.5" />
                New storefront energy
              </span>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-black uppercase tracking-[0.24em] text-white/38">{section.title}</h3>
                  <div className="mt-4 space-y-3">
                    {section.links.map((link) => (
                      <a key={link} href="#" className="block text-sm text-white/70 hover:text-white">
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/38">Stay Connected</p>
              <div className="mt-4 flex gap-3">
                {[Globe, Camera, MessageCircle, Play].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-white/78 hover:bg-white/14 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              <div className="mt-6 space-y-3 text-sm text-white/70">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-white/44" />
                  support@pillipot.com
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-white/44" />
                  1800-123-4567
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/4 p-6 backdrop-blur-xl md:p-8">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/38">Need Something Fast?</p>
              <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-white">Start exploring the latest collections.</h3>
              <p className="mt-3 text-sm leading-7 text-white/64">
                Browse trending products, discover category highlights, and jump back into shopping in a tap.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-5 py-3 text-sm font-bold text-[#123468] hover:-translate-y-0.5"
              >
                Explore storefront
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 py-5 text-sm text-white/42 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-pp-primary">
              <span className="text-sm font-black">P</span>
            </div>
            <span>© {new Date().getFullYear()} Pillipot Marketplace. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
