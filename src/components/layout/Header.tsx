"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, ChevronDown, User, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function Header() {
  const router = useRouter();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [search, setSearch] = React.useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/category/${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <header className="pp-gradient sticky top-0 z-50">
      <div className="pp-container w-full flex items-center px-4 md:px-8 h-16 gap-4 lg:gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-pp-primary font-black text-lg">P</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-extrabold text-lg tracking-tight">pillipot</span>
            <span className="text-white/60 text-[10px] font-medium tracking-widest uppercase">marketplace</span>
          </div>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-[560px] relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, brands & more..."
            className="w-full bg-white/15 backdrop-blur-sm border border-white/20 h-10 rounded-xl px-5 pr-12 text-sm outline-none text-white placeholder:text-white/50 focus:bg-white/25 focus:border-white/40 transition-all"
          />
          <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 w-7 h-7 flex items-center justify-center rounded-lg transition-colors">
            <Search className="text-white w-4 h-4" />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Link href="/orders" className="hidden md:flex items-center gap-2 text-white/80 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all text-sm font-medium">
            <User className="w-4 h-4" />
            Account
          </Link>

          <Link href="/wishlist" className="hidden lg:flex items-center gap-2 text-white/80 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all text-sm font-medium relative">
            <Heart className="w-4 h-4" />
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-pp-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="flex items-center gap-2 text-white px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-sm font-semibold relative">
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-pp-accent text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
