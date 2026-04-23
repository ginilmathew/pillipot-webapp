"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/api";

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export default function ProductSection({ title, products, viewAllLink = "#" }: ProductSectionProps) {
  return (
    <section className="mb-6 md:mb-8">
      {/* Section header */}
      <div className="mb-4 flex items-end justify-between gap-4 border-b border-slate-200/70 pb-4 md:mb-5">
        <div>
          <span className="pp-section-label">Shop by category</span>
          <h2 className="pp-section-title mt-1">{title}</h2>
          <span className="pp-section-divider" />
        </div>

        <Link
          href={viewAllLink}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-sky-100 bg-[#edf4ff] px-4 py-2 text-xs font-bold text-pp-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-3.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
