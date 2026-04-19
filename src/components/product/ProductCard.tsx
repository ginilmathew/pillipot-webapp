"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Heart } from "lucide-react";
import { Product } from "@/types";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const displayImage = product.imageUrl || product.image || "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=600";
  const rating = product.rating ?? 4.5;
  const reviews = product.reviews ?? 100;
  const discount = product.discount ?? 0;
  const originalPrice = product.originalPrice ?? (product.price * 1.1);

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="bg-white rounded-2xl p-3 flex flex-col group cursor-pointer hover:pp-shadow-hover hover:scale-[1.02] transition-all duration-300 h-full border border-gray-100/80 relative">
      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-xl bg-gray-50">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-pp-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
              {discount}% OFF
            </div>
          )}
        </div>
      </Link>

      {/* Wishlist button */}
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
        className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm z-10 ${
          wishlisted
            ? "bg-pp-accent text-white scale-110"
            : "bg-white/80 backdrop-blur-sm text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110"
        }`}
      >
        <Heart className={`w-4 h-4 ${wishlisted ? "fill-white" : ""}`} />
      </button>

      {/* Info */}
      <Link href={`/product/${product.id}`} className="flex flex-col gap-1.5 flex-1">
        <p className="text-[11px] text-pp-primary font-semibold uppercase tracking-wide">{product.brand}</p>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mt-auto">
          <div className="bg-pp-success text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            {rating} <Star className="w-2.5 h-2.5 fill-white" />
          </div>
          <span className="text-gray-400 text-[11px]">({reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-base font-bold text-gray-900">{formatPrice(product.price)}</span>
          {discount > 0 && (
            <span className="text-gray-400 text-xs line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
