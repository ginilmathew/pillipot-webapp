"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShieldCheck, ArrowRight, ShoppingBag, Package } from "lucide-react";

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

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-pp-surface">
        <Header />
        <main className="flex-1 pp-container px-4 py-8 md:py-10">
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/60 bg-white/78 p-6 text-center pp-shadow md:p-8">
            <div className="mb-5 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#edf4ff] md:h-24 md:w-24">
                <ShoppingBag className="h-10 w-10 text-pp-primary/40 md:h-12 md:w-12" />
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-black tracking-[-0.04em] text-slate-950 md:text-3xl">Your cart is empty</h2>
            <p className="mx-auto mb-6 max-w-md text-sm leading-7 text-slate-500">
              Looks like you haven&apos;t added anything yet. Start exploring and add your favorite products to the bag.
            </p>
            <Link
              href="/"
              className="pp-button-primary inline-flex rounded-full px-8 py-3 text-sm font-bold"
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
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />

      <main className="flex-1 pp-container px-4 py-5 md:py-6">
        <div className="mb-5 rounded-[1.6rem] border border-white/60 bg-white/68 p-4 pp-shadow md:mb-6 md:rounded-[2rem] md:p-5">
          <h1 className="text-2xl font-black tracking-[-0.05em] text-slate-950 md:text-3xl">Shopping Cart ({cartCount})</h1>
          <p className="mt-2 text-sm text-slate-500">Review quantities, savings, and delivery details before checkout.</p>
        </div>

        <div className="flex flex-col items-start gap-5 lg:flex-row lg:gap-6">
          <div className="flex w-full flex-1 flex-col gap-3">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className={`flex flex-col gap-4 rounded-[1.5rem] border border-white/60 bg-white/82 p-4 pp-shadow transition-all sm:flex-row sm:items-center sm:gap-4 md:rounded-[1.8rem] md:p-5 ${
                  syncingItems[item.id] ? "opacity-70 pointer-events-none sm:pointer-events-auto" : "opacity-100"
                }`}
              >
                <div className="flex items-center gap-3 sm:min-w-0 sm:flex-1">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[1rem] border border-slate-100 bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] md:h-24 md:w-24 md:rounded-[1.2rem]">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 80px, 96px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <Package className="m-auto h-8 w-8 text-gray-300" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-pp-primary">{item.brand}</p>
                    <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-slate-900 md:text-base">{item.name}</h3>
                    <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-lg font-black text-slate-950">{formatPrice(item.price)}</span>
                      {(item.discount ?? 0) > 0 && item.originalPrice && (
                        <>
                          <span className="text-xs text-slate-400 line-through">{formatPrice(item.originalPrice)}</span>
                          <span className="text-xs font-bold text-pp-success">{item.discount}% Off</span>
                        </>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">Free delivery by Mon, Apr 22</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <div className="flex flex-col items-start gap-2 sm:items-end">
                    <div className="flex items-center overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                      <button
                        onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                        disabled={item.cartQuantity <= 1 || syncingItems[item.id]}
                        className="flex h-8 w-8 items-center justify-center hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-9 text-center text-sm font-bold">
                        {syncingItems[item.id] ? "..." : item.cartQuantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                        disabled={item.cartQuantity >= (item.stockQuantity || 99) || syncingItems[item.id]}
                        className="flex h-8 w-8 items-center justify-center hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    {item.stockQuantity && item.stockQuantity < 10 && (
                      <span className="text-[10px] font-bold text-pp-accent">Only {item.stockQuantity} left</span>
                    )}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    disabled={syncingItems[item.id]}
                    className="rounded-xl p-2 text-slate-400 hover:bg-red-50 hover:text-pp-accent disabled:opacity-30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full lg:sticky lg:top-20 lg:w-[330px]">
            <div className="overflow-hidden rounded-[1.6rem] border border-white/60 bg-white/82 pp-shadow md:rounded-[1.8rem]">
              <h2 className="border-b border-slate-100 p-4 text-xs font-black uppercase tracking-[0.22em] text-slate-400 md:p-5">Price Details</h2>
              <div className="space-y-4 p-4 md:p-5">
                <div className="flex justify-between text-sm text-slate-700">
                  <span>Price ({cartCount} item{cartCount > 1 ? 's' : ''})</span>
                  <span>{formatPrice(cartMrpTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700">Discount</span>
                  <span className="text-pp-success font-semibold">- {formatPrice(cartMrpTotal - cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700">Delivery</span>
                  <span className="text-pp-success font-semibold uppercase">Free</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-slate-200 pt-4 text-base font-black text-slate-950">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
              <div className="border-t border-slate-100 bg-green-50/60 p-4">
                <p className="text-pp-success font-semibold text-xs text-center">
                  🎉 You save {formatPrice(cartMrpTotal - cartTotal)} on this order
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (Object.values(syncingItems).some(isSyncing => isSyncing)) return;
                router.push("/checkout");
              }}
              disabled={Object.values(syncingItems).some(isSyncing => isSyncing)}
              className="pp-button-primary mt-4 flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold disabled:cursor-wait disabled:opacity-50"
            >
              {Object.values(syncingItems).some(isSyncing => isSyncing) ? "SAVING CHANGES..." : "PROCEED TO CHECKOUT"}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>Safe & secure payments. 100% authentic products.</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
