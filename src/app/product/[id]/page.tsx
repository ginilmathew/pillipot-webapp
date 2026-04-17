"use client";

import { use } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PRODUCTS } from "@/data/products";
import Image from "next/image";
import { Star, ShoppingCart, Zap, ShieldCheck, MapPin, Tag, Truck, RotateCcw, Heart, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push("/checkout");
  };

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />

      <main className="flex-1 pp-container px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 flex items-center gap-1.5 mb-6">
          <a href="/" className="hover:text-pp-primary">Home</a>
          <span className="text-gray-300">›</span>
          <a href={`/category/${product.category}`} className="hover:text-pp-primary">{product.category}</a>
          <span className="text-gray-300">›</span>
          <span className="text-gray-700 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Image */}
          <div className="lg:w-[45%] flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 relative aspect-square pp-shadow">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain p-6"
                priority
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-pp-accent text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {product.discount}% OFF
                </div>
              )}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border border-gray-100 ${
                    isInWishlist(product.id)
                      ? "bg-pp-accent text-white"
                      : "bg-white/90 backdrop-blur-sm hover:bg-pp-accent hover:text-white"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-white" : ""}`} />
                </button>
                <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-pp-primary hover:text-white transition-all shadow-sm border border-gray-100">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-pp-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-pp-primary-dark shadow-lg hover:shadow-xl transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                ADD TO CART
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 pp-gradient-warm text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-xl shadow-lg transition-all"
              >
                <Zap className="w-5 h-5" />
                BUY NOW
              </button>
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:w-[55%] flex flex-col gap-5">
            <div>
              <p className="text-pp-primary text-xs font-bold uppercase tracking-widest mb-1">{product.brand}</p>
              <h1 className="text-2xl font-bold text-gray-900 leading-relaxed">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-pp-success text-white text-sm font-bold px-2.5 py-1 rounded-lg">
                {product.rating} <Star className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="text-gray-500 text-sm">
                {product.reviews.toLocaleString()} ratings & reviews
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-gray-900">{formatPrice(product.price)}</span>
              {product.discount > 0 && (
                <>
                  <span className="text-gray-400 line-through text-lg">{formatPrice(product.originalPrice)}</span>
                  <span className="text-pp-success text-base font-bold">Save {formatPrice(product.originalPrice - product.price)}</span>
                </>
              )}
            </div>

            {/* Offers */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 pp-shadow">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">🎉 Available Offers</h3>
              <ul className="space-y-2.5">
                {[
                  "10% instant discount on Pillipot Pay, up to ₹1,000",
                  "Extra 15% off on first purchase with code WELCOME15",
                  "Free delivery on this item",
                  "Buy 2, get extra ₹250 off on next purchase",
                ].map((offer, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-gray-700">
                    <Tag className="w-4 h-4 text-pp-primary shrink-0 mt-0.5" />
                    <span>{offer}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center gap-2 text-center">
                <Truck className="w-6 h-6 text-pp-primary" />
                <span className="text-xs font-semibold text-gray-700">Free Delivery</span>
                <span className="text-[10px] text-gray-400">by Apr 22</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center gap-2 text-center">
                <RotateCcw className="w-6 h-6 text-pp-primary" />
                <span className="text-xs font-semibold text-gray-700">7 Day Returns</span>
                <span className="text-[10px] text-gray-400">Easy replacement</span>
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center gap-2 text-center">
                <ShieldCheck className="w-6 h-6 text-pp-primary" />
                <span className="text-xs font-semibold text-gray-700">1 Year Warranty</span>
                <span className="text-[10px] text-gray-400">Brand warranty</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 pp-shadow">
              <h3 className="text-base font-bold text-gray-900 mb-3">Product Description</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
