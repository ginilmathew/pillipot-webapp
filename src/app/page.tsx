import Header from "@/components/layout/Header";
import CategoryBar from "@/components/layout/CategoryBar";
import ProductSection from "@/components/product/ProductSection";
import Footer from "@/components/layout/Footer";
import { getProducts, getCategories, type Product, type Category } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Gift, Truck } from "lucide-react";

export default async function Home() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const sections = categories.map(cat => ({
    title: cat.name,
    products: products.filter(p => p.categoryId === cat.id).slice(0, 5),
    link: `/category/${cat.id}`
  })).filter(s => s.products.length > 0);
  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />

      {/* Hero Banner - Full bleed to merge with Header gradient seamlessly */}
      <div className="w-full relative overflow-hidden pp-gradient cursor-pointer border-b border-white/5 pb-12 md:pb-16">
        <div className="pp-container px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center min-h-[300px] md:min-h-[380px]">
            <div className="py-8 md:py-12 flex-1 z-10 relative">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-5 tracking-tight">
                Up to <span className="text-yellow-300">80% Off</span> <br /> on Top Brands
              </h1>
              <p className="text-white/80 text-sm md:text-lg mb-8 max-w-md font-medium">
                Shop the best electronics, fashion, home & more with free delivery and easy returns.
              </p>
              <Link href="/category/Top Offers" className="inline-flex items-center gap-2 bg-white text-pp-primary px-8 py-3.5 rounded-full font-black tracking-wide hover:shadow-2xl hover:scale-105 transition-all outline-none focus:ring-4 focus:ring-white/50 shadow-lg">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="w-full md:absolute md:right-0 md:top-0 md:bottom-0 md:w-[50%] h-64 md:h-auto mt-6 md:mt-0 opacity-90 hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-gradient-to-r from-[#9333ea] to-transparent z-10 hidden md:block" style={{ background: 'linear-gradient(to right, var(--tw-gradient-stops))', '--tw-gradient-from': '#8b5cf6', '--tw-gradient-to': 'transparent' } as any} />
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200"
                alt="Flash Sale"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-right rounded-2xl md:rounded-none md:object-right"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 pp-container px-4 pb-8">

        {/* Feature badges - Pulled up to overlap the hero banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 -mt-8 relative z-20">
          <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-xl shadow-gray-200/50 border border-gray-100/50 transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6 text-pp-primary" />
            </div>
            <div>
              <p className="font-extrabold text-gray-900 text-sm">Free Delivery</p>
              <p className="text-xs text-gray-500 font-medium">On orders above ₹499</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-xl shadow-gray-200/50 border border-gray-100/50 transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6 text-pp-accent" />
            </div>
            <div>
              <p className="font-extrabold text-gray-900 text-sm">Best Deals</p>
              <p className="text-xs text-gray-500 font-medium">Up to 70% cashback</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-xl shadow-gray-200/50 border border-gray-100/50 transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-pp-success" />
            </div>
            <div>
              <p className="font-extrabold text-gray-900 text-sm">Easy Returns</p>
              <p className="text-xs text-gray-500 font-medium">7-day replacement policy</p>
            </div>
          </div>
        </div>

        {/* Dynamic Product Sections from API */}
        {sections.map((s, i) => (
          <ProductSection key={i} title={s.title} products={s.products} viewAllLink={s.link} />
        ))}
      </main>

      <Footer />
    </div>
  );
}
