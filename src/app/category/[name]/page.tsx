"use client";

import { use } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryBar from "@/components/layout/CategoryBar";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/data/products";

export default function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const decodedName = decodeURIComponent(name);
  const normalizedCategory = decodedName.split(' ')[0];

  const products = PRODUCTS.filter((p) =>
    p.category.toLowerCase().includes(normalizedCategory.toLowerCase()) ||
    p.name.toLowerCase().includes(normalizedCategory.toLowerCase()) ||
    p.brand.toLowerCase().includes(normalizedCategory.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />
      <CategoryBar />

      <main className="flex-1 pp-container px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className="hidden lg:flex flex-col w-60 shrink-0 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 pp-shadow p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-5 uppercase tracking-wider">Filters</h2>
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Price Range</span>
                  <input type="range" className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pp-primary" />
                  <div className="flex justify-between mt-2 text-xs text-gray-400">
                    <span>₹0</span>
                    <span>₹1,50,000</span>
                  </div>
                </div>
                <FilterSection title="Brand" items={Array.from(new Set(products.map(p => p.brand))).slice(0, 6)} />
                <FilterSection title="Rating" items={["4★ & above", "3★ & above"]} />
                <FilterSection title="Discount" items={["50% or more", "30% or more", "10% or more"]} />
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="mb-5">
              <nav className="text-xs text-gray-400 mb-1">Home › {decodedName}</nav>
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-900">
                  {products.length > 0 ? `${decodedName}` : "No Results"}
                  <span className="text-gray-400 font-normal text-sm ml-2">({products.length} products)</span>
                </h1>
                <div className="hidden md:flex items-center gap-4 text-xs font-medium text-gray-500">
                  <span className="text-pp-primary font-bold border-b-2 border-pp-primary pb-0.5 cursor-pointer">Relevance</span>
                  <span className="cursor-pointer hover:text-pp-primary">Price ↑</span>
                  <span className="cursor-pointer hover:text-pp-primary">Price ↓</span>
                  <span className="cursor-pointer hover:text-pp-primary">Newest</span>
                </div>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-gray-400 text-lg font-medium mb-4">No products found for &quot;{decodedName}&quot;</p>
                <button onClick={() => window.history.back()} className="text-pp-primary font-bold hover:underline">
                  Go Back
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FilterSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</span>
      {items.map(item => (
        <label key={item} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer hover:text-pp-primary">
          <input type="checkbox" className="w-3.5 h-3.5 rounded accent-pp-primary" />
          {item}
        </label>
      ))}
    </div>
  );
}
