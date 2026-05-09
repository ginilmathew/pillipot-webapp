"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuTrash2, LuPlus, LuMinus, LuShieldCheck, LuArrowRight, LuShoppingBag, LuPackage, LuCheck } from "react-icons/lu";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, cartTotal, cartMrpTotal, cartCount, syncingItems } = useCart();

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const codDeliveryFee = cart.length > 0
    ? Math.max(0, ...cart.map((item) => {
        let charge = Number(item.codDeliveryCharge || 0);
        if (item.codDeliveryMilestones && item.codDeliveryMilestones.length > 0) {
          const sorted = [...item.codDeliveryMilestones].sort((a, b) => b.quantity - a.quantity);
          const matching = sorted.find((m) => item.cartQuantity >= m.quantity);
          if (matching) {
            charge = Number(matching.charge);
          }
        }
        return charge;
      }))
    : 0;

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 md:py-12">
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-100 bg-white p-10 text-center shadow-xl shadow-slate-200/50">
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 text-pp-primary/30">
                <LuShoppingBag className="h-12 w-12" />
              </div>
            </div>
            <h2 className="mb-3 text-3xl font-black font-sora text-slate-900">Your cart is empty</h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-slate-500 font-medium">
              Looks like you haven&apos;t added anything yet. Explore our curated collections to find something special.
            </p>
            <Link
              href="/"
              className="bg-pp-primary text-white rounded-full px-10 py-4 text-sm font-bold shadow-lg shadow-pp-primary/25 hover:scale-105 active:scale-95 transition-all inline-block"
            >
              EXPLORE PRODUCTS
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f1f5f9]">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        {/* Cart Intro Section */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-sm border border-slate-100">
          <h1 className="text-3xl font-black font-sora text-slate-900 mb-2">Shopping Cart ({cartCount})</h1>
          <p className="text-slate-500 font-medium">Review quantities, savings, and delivery details before checkout.</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <section className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-slate-100 transition hover:shadow-md ${
                  syncingItems[item.id] ? "opacity-70 grayscale pointer-events-none" : "opacity-100"
                }`}
              >
                <div className="w-32 h-32 flex-shrink-0 bg-slate-50 rounded-2xl p-3 relative group overflow-hidden">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="128px"
                      className="object-contain p-2 mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <LuPackage className="h-10 w-10 text-slate-200" />
                    </div>
                  )}
                </div>
                
                <div className="flex-grow text-center sm:text-left min-w-0">
                  <p className="text-[10px] font-bold text-pp-primary uppercase tracking-[0.2em] mb-1">{item.brand || "PILLIPOT"}</p>
                  <h3 className="text-xl font-bold font-sora text-slate-800 capitalize truncate">{item.name}</h3>
                  <div className="mt-2 flex items-baseline justify-center sm:justify-start gap-2">
                    <span className="text-2xl font-black text-slate-900">{formatPrice(item.price)}</span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <>
                        <span className="text-slate-400 line-through text-sm">{formatPrice(item.originalPrice)}</span>
                        <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-0.5 rounded-md">
                          {Math.round((1 - item.price / item.originalPrice) * 100)}% Off
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs mt-3 font-bold flex items-center justify-center sm:justify-start gap-1 uppercase tracking-wider">
                    <LuCheck className="h-3.5 w-3.5 text-green-500" />
                    Dispatch in 24 hours
                  </p>
                </div>

                <div className="flex flex-col items-center sm:items-end gap-6 shrink-0">
                  <div className="flex items-center border-2 border-slate-100 rounded-full p-1 bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                      disabled={item.cartQuantity <= 1 || syncingItems[item.id]}
                      className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-pp-primary transition hover:bg-white rounded-full disabled:opacity-20"
                    >
                      <LuMinus className="h-4 w-4" />
                    </button>
                    <span className="px-4 font-black text-slate-800 text-sm min-w-[3rem] text-center">
                      {syncingItems[item.id] ? "..." : item.cartQuantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                      disabled={item.cartQuantity >= (item.stockQuantity || 99) || syncingItems[item.id]}
                      className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-pp-primary transition hover:bg-white rounded-full disabled:opacity-20"
                    >
                      <LuPlus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    disabled={syncingItems[item.id]}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <LuTrash2 className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Price Details Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-50">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Price Details</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between font-medium text-sm">
                  <span className="text-slate-500">Price ({cartCount} items)</span>
                  <span className="text-slate-900">{formatPrice(cartMrpTotal)}</span>
                </div>
                <div className="flex justify-between font-medium text-sm">
                  <span className="text-slate-500">Discount</span>
                  <span className="text-green-600">- {formatPrice(cartMrpTotal - cartTotal)}</span>
                </div>
                <div className="flex justify-between font-medium text-sm">
                  <span className="text-slate-500">Prepaid Delivery</span>
                  <span className="text-green-600 font-bold uppercase tracking-wider">Free</span>
                </div>
                {codDeliveryFee > 0 && (
                  <div className="flex justify-between font-medium text-sm">
                    <span className="text-slate-500">COD Delivery</span>
                    <span className="text-slate-900">{formatPrice(codDeliveryFee)}</span>
                  </div>
                )}
                
                <div className="border-t border-dashed border-slate-200 pt-5 mt-6">
                  <div className="flex justify-between items-end">
                    <span className="text-xl font-black font-sora text-slate-900">Total</span>
                    <div className="text-right">
                      <div className="text-2xl font-black text-slate-900">{formatPrice(cartTotal)}</div>
                      {codDeliveryFee > 0 && (
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">+ {formatPrice(codDeliveryFee)} IF COD</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50/50 p-4 text-center border-t border-green-100">
                <p className="text-green-700 font-bold text-xs uppercase tracking-wider">
                  🥳 You save {formatPrice(cartMrpTotal - cartTotal)} on this order
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (Object.values(syncingItems).some(isSyncing => isSyncing)) return;
                router.push("/checkout");
              }}
              disabled={Object.values(syncingItems).some(isSyncing => isSyncing)}
              className="w-full bg-pp-primary text-white py-5 rounded-full font-black font-sora text-lg flex items-center justify-center gap-3 shadow-lg shadow-pp-primary/30 hover:brightness-110 active:scale-95 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:grayscale disabled:cursor-wait"
            >
              {Object.values(syncingItems).some(isSyncing => isSyncing) ? "SAVING..." : "PROCEED TO CHECKOUT"}
              <LuArrowRight className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-400 px-4">
              <LuShieldCheck className="h-5 w-5 shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-wider leading-tight text-center">Safe & secure payments. 100% authentic products.</span>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
