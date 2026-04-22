"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/api";

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export default function ProductSection({ title, products, viewAllLink = "#" }: ProductSectionProps) {
  return (
    <section className="mb-8 rounded-[1.6rem] border border-white/60 bg-white/52 p-4 pp-shadow md:mb-10 md:rounded-[2rem] md:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:mb-6">
        <div>
          <div className="pp-chip text-slate-600">
            <Sparkles className="h-3.5 w-3.5 text-pp-primary" />
            Shop by category
          </div>
          <h2 className="mt-3 text-xl font-black tracking-[-0.04em] text-slate-950 md:text-2xl">{title}</h2>
        </div>
        <Link
          href={viewAllLink}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-100 bg-[#edf4ff] px-4 py-2 text-sm font-bold text-pp-primary hover:-translate-y-0.5"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
