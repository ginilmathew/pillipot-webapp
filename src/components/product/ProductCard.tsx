"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart, ArrowUpRight } from "lucide-react";
import { Product } from "@/lib/api";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const displayImage =
    product.imageUrl ||
    `data:image/svg+xml;base64,${btoa(
      '<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#EEF4FF"/><circle cx="200" cy="170" r="68" stroke="#C7D4EF" stroke-width="2" stroke-dasharray="6 6"/><path d="M200 138V202M168 170H232" stroke="#9CB2DA" stroke-width="3" stroke-linecap="round"/><text x="200" y="286" text-anchor="middle" fill="#6E86B7" font-family="sans-serif" font-size="14" font-weight="700" letter-spacing="0.08em">COMING SOON</text></svg>'
    )}`;

  const rating = product.rating || 0;
  const reviewsCount = product.reviewsCount ?? 0;
  const discount = product.discount ?? 0;
  const originalPrice = product.originalPrice ?? product.price * 1.1;
  const isOutOfStock = (product.stockQuantity ?? 0) <= 0;

  const formatPrice = (num: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/55 bg-white/84 p-3 pp-shadow ${
        isOutOfStock
          ? "opacity-75 grayscale-[0.08]"
          : "hover:-translate-y-1.5 hover:border-sky-100 hover:pp-shadow-hover"
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,rgba(31,111,255,0.12),transparent_55%)]" />

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        className={`absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 shadow-sm ${
          wishlisted ? "text-pp-accent" : "text-slate-300 hover:text-pp-accent"
        }`}
        aria-label="Toggle wishlist"
      >
        <Heart className={`h-4 w-4 ${wishlisted ? "fill-current" : ""}`} />
      </button>

      <Link href={isOutOfStock ? "#" : `/product/${product.id}`} className="relative z-10 block">
        <div className="relative mb-4 aspect-[4/4.4] overflow-hidden rounded-[1.35rem] border border-slate-100 bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] p-3">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
            className="object-contain p-3 transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute left-3 top-3 flex items-center gap-2">
            {discount > 0 ? (
              <span className="rounded-full bg-[#081120] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                {discount}% off
              </span>
            ) : null}
            {product.brand ? (
              <span className="rounded-full border border-white/70 bg-white/82 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                {product.brand}
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-slate-800 shadow-sm">
            <Star className="h-3 w-3 fill-[#ffbe5c] text-[#ffbe5c]" />
            {rating.toFixed(1)}
            {reviewsCount > 0 ? <span className="text-slate-400">({reviewsCount})</span> : null}
          </div>

          {isOutOfStock ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
              <span className="rounded-full bg-red-500 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
                Out of stock
              </span>
            </div>
          ) : null}
        </div>
      </Link>

      <Link href={`/product/${product.id}`} className="relative z-10 flex flex-1 flex-col px-1 pb-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-[0.98rem] font-bold leading-6 text-slate-900 group-hover:text-pp-primary">
            {product.name}
          </h3>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-pp-primary" />
        </div>

        <p className="mt-2 line-clamp-1 text-sm text-slate-500">
          Curated pick for everyday shopping and quick checkout.
        </p>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-xl font-black tracking-[-0.04em] text-slate-950">
              {formatPrice(product.price)}
            </span>
            {discount > 0 ? (
              <>
                <span className="text-sm font-medium text-slate-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-pp-success">
                  Save big
                </span>
              </>
            ) : null}
          </div>
        </div>
      </Link>
    </div>
  );
}
