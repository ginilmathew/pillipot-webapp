"use client";

import Header from "@/components/layout/Header";
import CategoryBar from "@/components/layout/CategoryBar";
import ProductSection from "@/components/product/ProductSection";
import Footer from "@/components/layout/Footer";
import { getProducts, getCategories, type Product, type Category } from "@/lib/api";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Gift, Truck } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [p, c] = await Promise.all([getProducts(), getCategories()]);
        setProducts(p);
        setCategories(c);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const sections = useMemo(() => {
    return categories.map(cat => ({
      title: cat.name,
      products: products.filter(p => p.categoryId === cat.id).slice(0, 5),
      link: `/category/${cat.id}`
    })).filter(s => s.products.length > 0);
  }, [products, categories]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Marketplace...</div>;


  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />
      <CategoryBar />

      <main className="flex-1 pp-container px-4 py-6">
        {/* Hero Banner */}
        <div className="relative w-full rounded-2xl overflow-hidden mb-8 pp-gradient group cursor-pointer">
          <div className="flex flex-col md:flex-row items-center">
            <div className="p-8 md:p-12 lg:p-16 flex-1 z-10">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-300" />
                <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">Flash Sale Live Now</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                Up to <span className="text-yellow-300">40% Off</span><br />
                on Top Brands
              </h1>
              <p className="text-white/60 text-sm md:text-base mb-8 max-w-md">
                Shop the best electronics, fashion, home & more with free delivery and easy returns.
              </p>
              <Link href="/category/Top Offers" className="inline-flex items-center gap-2 bg-white text-pp-primary px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative w-full md:w-[45%] h-64 md:h-[360px]">
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800"
                alt="Flash Sale"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover md:object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Feature badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 pp-shadow border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
              <Truck className="w-5 h-5 text-pp-primary" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Free Delivery</p>
              <p className="text-xs text-gray-500">On orders above ₹499</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 pp-shadow border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <Gift className="w-5 h-5 text-pp-accent" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Best Deals</p>
              <p className="text-xs text-gray-500">Up to 70% cashback</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 flex items-center gap-3 pp-shadow border border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-pp-success" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Easy Returns</p>
              <p className="text-xs text-gray-500">7-day replacement policy</p>
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
