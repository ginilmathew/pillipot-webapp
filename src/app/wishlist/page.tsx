"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const formatPrice = (num: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);

  const handleMoveToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-pp-surface">
        <Header />
        <main className="flex-1 pp-container flex flex-col items-center justify-center py-20 px-4">
          <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-6">
            <Heart className="w-12 h-12 text-pp-accent/40" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8 text-center max-w-xs">
            Save items you love to your wishlist. Review them anytime and easily move them to the cart.
          </p>
          <Link
            href="/"
            className="pp-gradient text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            EXPLORE PRODUCTS
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />

      <main className="flex-1 pp-container px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist ({wishlist.length})</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 pp-shadow hover:pp-shadow-hover transition-all overflow-hidden group"
            >
              {/* Image */}
              <Link href={`/product/${item.id}`}>
                <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-pp-accent text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>
              </Link>

              {/* Info */}
              <div className="p-4 flex flex-col gap-2">
                <p className="text-[11px] text-pp-primary font-semibold uppercase tracking-wider">{item.brand}</p>
                <Link href={`/product/${item.id}`}>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-pp-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1.5">
                  <div className="bg-pp-success text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                    {item.rating} <Star className="w-2.5 h-2.5 fill-white" />
                  </div>
                  <span className="text-gray-400 text-[11px]">({item.reviews.toLocaleString()})</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-gray-900">{formatPrice(item.price)}</span>
                  {item.discount > 0 && (
                    <span className="text-gray-400 text-xs line-through">{formatPrice(item.originalPrice)}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="flex-1 bg-pp-primary text-white py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-pp-primary-dark transition-all"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-pp-accent hover:border-pp-accent hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
