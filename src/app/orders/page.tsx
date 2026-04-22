"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import { getMyOrders, cancelOrderApi, downloadInvoice } from "@/lib/api";
import { Package, ShoppingBag, Loader2, Search, RotateCcw, AlertTriangle, Star, X, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { submitReview } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import useSWR from "swr";
import { swrKeys } from "@/lib/swrKeys";

type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  sellingAmount: number;
  imageUrl?: string;
};

type Order = {
  orderId: string;
  createdAt: string;
  total: number;
  customerName?: string;
  status: string;
  items: OrderItem[];
};

export default function MyOrdersPage() {
  const { token, user, loading } = useAuth();
  const { addToCart } = useCart();
  const { success, error } = useToast();
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewingProduct, setReviewingProduct] = useState<{ id: string; name: string; imageUrl?: string } | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const router = useRouter();

  const {
    data: orders = [],
    isLoading: isOrdersLoading,
    mutate: mutateOrders,
  } = useSWR(token ? swrKeys.myOrders(token) : null, ([, t]) => getMyOrders(t), {
    keepPreviousData: true,
  });

  useEffect(() => {
    if (loading) return;
    if (!token) {
      router.push("/");
      return;
    }
  }, [loading, router, token]);

  const handleCancelClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!selectedOrderId || !token) return;
    
    setIsCancelling(true);
    const apiSuccess = await cancelOrderApi(token, selectedOrderId);
    if (apiSuccess) {
      await mutateOrders();
      setShowCancelModal(false);
      setSelectedOrderId(null);
      success("Order cancelled successfully");
    } else {
      error("Failed to cancel order");
    }
    setIsCancelling(false);
  };
  
  const handleReviewClick = (product: { id: string; name: string; imageUrl?: string }) => {
    setReviewingProduct(product);
    setRating(0);
    setComment("");
    setShowReviewModal(true);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !reviewingProduct || rating === 0) return;

    setIsSubmittingReview(true);
    try {
      await submitReview(token, reviewingProduct.id, rating, comment);
      setShowReviewModal(false);
      setReviewingProduct(null);
      success("Review submitted successfully!");
    } catch (err) {
      console.error(err);
      error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const formatPrice = (num: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);

  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />

      <main className="flex-1 pp-container py-6 md:py-8">
        <div className="mb-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="rounded-[1.6rem] border border-white/60 bg-white/68 p-4 pp-shadow md:min-w-[420px] md:rounded-[2rem] md:p-5">
              <nav className="mb-2 flex gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                <span className="hover:text-pp-primary cursor-pointer" onClick={() => router.push("/")}>Your Account</span>
                <span>•</span>
                <span className="text-pp-primary">Your Orders</span>
              </nav>
              <h1 className="text-2xl font-black tracking-[-0.05em] text-slate-950 md:text-3xl">Your Orders</h1>
              <p className="mt-2 text-sm text-slate-500">Track current purchases, reorder items, and manage reviews from one place.</p>
            </div>
            <div className="relative group lg:w-96">
              <input
                type="text"
                placeholder="Search all orders..."
                className="w-full rounded-full border border-white/60 bg-white/78 py-3.5 pl-5 pr-12 text-sm font-medium outline-none pp-shadow focus:border-sky-100"
              />
              <button className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-pp-dark text-white hover:bg-pp-primary">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="no-scrollbar flex gap-3 overflow-x-auto rounded-full border border-white/60 bg-white/68 p-2 text-sm font-bold pp-shadow">
            {["Orders", "Buy Again", "Not Yet Shipped", "Cancelled"].map((tab, i) => (
              <button
                key={tab}
                className={`whitespace-nowrap rounded-full px-4 py-2 transition-colors ${i === 0 ? "bg-[#edf4ff] text-pp-primary" : "text-slate-400 hover:text-slate-600"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {isOrdersLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-pp-primary animate-spin" />
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="mx-auto mt-20 max-w-2xl rounded-[2rem] border border-white/60 bg-white/78 p-12 text-center pp-shadow">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
              <ShoppingBag className="h-10 w-10 text-slate-300" />
            </div>
            <h2 className="mb-2 text-2xl font-black tracking-[-0.04em] text-slate-950">No orders found</h2>
            <p className="mb-8 text-slate-500">Looks like you haven&apos;t placed any orders yet. Start shopping to see them here!</p>
            <button
              onClick={() => router.push("/")}
              className="pp-button-primary rounded-full px-10 py-4 text-sm font-black"
            >
              START SHOPPING
            </button>
          </div>
        ) : (
          <div className="space-y-5 md:space-y-8">
            {orders.map((order) => (
              <div key={order.orderId} className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/82 pp-shadow transition-all hover:pp-shadow-hover">
                <div className="grid grid-cols-2 items-center gap-4 border-b border-slate-100 bg-slate-50/80 px-4 py-4 md:grid-cols-4 md:gap-6 md:px-6">
                  <div>
                    <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Order Placed</p>
                    <p className="text-sm font-bold text-slate-700">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total</p>
                    <p className="text-sm font-bold text-slate-700">{formatPrice(order.total)}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ship To</p>
                    <p className="max-w-[150px] truncate text-sm font-bold text-pp-primary hover:underline cursor-pointer" title={order.customerName || user?.name}>
                      {order.customerName || user?.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="mb-1 text-[10px] font-black uppercase tracking-[0.2em] leading-none text-slate-400">Order # {order.orderId}</p>
                    <div className="mt-1 flex justify-end gap-3 underline-offset-4 decoration-pp-primary/30">
                      <button 
                        onClick={() => router.push(`/orders/${order.orderId}`)}
                        className="text-xs font-bold text-pp-primary hover:underline"
                      >
                        Order details
                      </button>
                      <span className="text-gray-300">|</span>
                      <button 
                        onClick={() => downloadInvoice(token!, order.orderId)}
                        className="text-xs font-bold text-pp-primary hover:underline"
                      >
                        Invoice
                      </button>
                    </div>
                  </div>
                </div>

                 <div className="p-4 md:p-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="flex items-center gap-3">
                        {order.status.toLowerCase() === 'delivered' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : order.status.toLowerCase() === 'cancelled' ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <Clock className="w-5 h-5 text-pp-primary" />
                        )}
                        <h3 className="text-lg font-black text-slate-950">
                          {order.status.toLowerCase() === 'delivered' 
                            ? 'Delivered' 
                            : order.status.toLowerCase() === 'cancelled' 
                              ? 'Status: Cancelled' 
                              : `Arriving soon (Status: ${order.status})`}
                        </h3>
                      </div>

                      <div className="space-y-6">
                        {order.items.map((item, idx: number) => (
                          <div key={idx} className="group/item flex gap-3 sm:gap-5">
                            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[1rem] border border-slate-100 bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] shadow-sm sm:h-24 sm:w-24 sm:rounded-[1.2rem]">
                              {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.productName} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                              ) : (
                                <Package className="w-8 h-8 text-gray-200" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="mb-1 line-clamp-2 cursor-pointer text-sm font-black leading-snug text-pp-primary hover:text-pp-primary-dark hover:underline">
                                {item.productName}
                              </p>
                              <p className="mb-3 text-xs text-slate-500">Quantity: <span className="font-bold text-slate-700">{item.quantity}</span></p>
                               <div className="flex flex-wrap gap-2">
                                <button 
                                  onClick={() => {
                                    addToCart({
                                      id: item.productId,
                                      name: item.productName,
                                      price: item.sellingAmount / item.quantity,
                                      imageUrl: item.imageUrl,
                                      stockQuantity: 100 // Fallback
                                    });
                                    router.push("/cart");
                                  }}
                                  className="flex items-center gap-1.5 rounded-full bg-pp-accent-warm px-4 py-2 text-[10px] font-black uppercase tracking-wider text-white shadow-sm transition-all hover:brightness-110"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" /> Buy it again
                                </button>
                                <button 
                                  onClick={() => router.push(`/product/${item.productId}`)}
                                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-wider text-slate-600 transition-all hover:bg-slate-50"
                                >
                                  View Item
                                </button>
                                {order.status.toLowerCase() === 'delivered' && (
                                  <button 
                                    onClick={() => handleReviewClick({ id: item.productId, name: item.productName, imageUrl: item.imageUrl })}
                                    className="rounded-full bg-[#edf4ff] px-4 py-2 text-[10px] font-black uppercase tracking-wider text-pp-primary transition-all hover:bg-pp-primary hover:text-white"
                                  >
                                    Write a review
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                      <div className="lg:w-64 flex flex-col gap-3">
                        {order.status.toLowerCase() === 'pending' && (
                          <button
                            onClick={() => handleCancelClick(order.orderId)}
                            className="w-full rounded-full bg-red-500 py-3 text-center text-xs font-black uppercase tracking-[0.2em] text-white shadow-lg transition-all hover:bg-red-600"
                          >
                            CANCEL
                          </button>
                        )}
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Cancel Order?</h3>
              <p className="text-gray-500 font-medium">Are you sure you want to cancel this order? This action cannot be undone.</p>
            </div>
            <div className="flex border-t border-gray-100 p-4 gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-4 bg-gray-50 text-gray-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={confirmCancel}
                disabled={isCancelling}
                className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 disabled:opacity-50"
              >
                {isCancelling ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "YES, CANCEL"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Review Modal */}
      {showReviewModal && reviewingProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">Write a Review</h3>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleReviewSubmit} className="p-8 space-y-6">
              <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0 flex items-center justify-center">
                  {reviewingProduct.imageUrl ? (
                                <img src={reviewingProduct.imageUrl} alt={reviewingProduct.name} className="h-full w-full object-cover" />
                  ) : (
                    <Package className="w-6 h-6 text-gray-200" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 line-clamp-2">{reviewingProduct.name}</p>
                </div>
              </div>

              <div className="text-center space-y-3">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Rate this product</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform active:scale-90"
                    >
                      <Star 
                        className={`w-10 h-10 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Your Feedback</p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you like or dislike about this product?"
                  className="w-full bg-gray-50 border-2 border-transparent focus:border-pp-primary focus:bg-white rounded-2xl p-4 outline-none transition-all text-sm font-medium min-h-[120px] resize-none text-left"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-4 bg-gray-50 text-gray-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReview || rating === 0}
                  className="flex-1 py-4 bg-pp-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-pp-primary-dark transition-colors shadow-lg shadow-pp-primary/20 disabled:opacity-50"
                >
                  {isSubmittingReview ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Submit Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
