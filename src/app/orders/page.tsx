"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Search, ChevronRight, Package, CheckCircle2, XCircle, Truck } from "lucide-react";

// Self-contained mock items to decouple from the deprecated data/products module
const MOCK_ITEMS = [
  { id: "1", name: "Wireless Headphones", price: 2999, brand: "Sony", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800" },
  { id: "2", name: "Running Shoes", price: 4500, brand: "Nike", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800" },
  { id: "3", name: "Smart Watch", price: 5999, brand: "Apple", imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" },
  { id: "4", name: "Backpack", price: 1200, brand: "Puma", imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800" },
];

const MOCK_ORDERS = [
  {
    orderId: "PP1234567130",
    status: "Delivered",
    date: "Dec 12, 2025",
    items: [MOCK_ITEMS[0]],
  },
  {
    orderId: "PP9876543510",
    status: "Cancelled",
    date: "Jan 05, 2026",
    items: [MOCK_ITEMS[1]],
  },
  {
    orderId: "PP1122334455",
    status: "On the way",
    date: "Apr 15, 2026",
    expected: "Apr 22, 2026",
    items: [MOCK_ITEMS[2], MOCK_ITEMS[3]],
  },
];

export default function OrdersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />

      <main className="flex-1 pp-container px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className="hidden md:flex flex-col w-56 gap-4">
            <div className="bg-white rounded-2xl border border-gray-100 pp-shadow p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-4">Filters</h2>
              <div className="space-y-5">
                <FilterSection title="Status" items={["On the way", "Delivered", "Cancelled", "Returned"]} />
                <FilterSection title="Time" items={["Last 30 days", "2025", "2024"]} />
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex bg-white rounded-xl border border-gray-100 pp-shadow overflow-hidden">
              <input
                type="text"
                placeholder="Search your orders..."
                className="flex-1 px-5 py-3 outline-none text-sm"
              />
              <button className="pp-gradient text-white px-6 font-semibold flex items-center gap-2 text-sm">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {MOCK_ORDERS.map((order) => (
              <div key={order.orderId} className="bg-white rounded-2xl border border-gray-100 pp-shadow hover:pp-shadow-hover transition-shadow p-5">
                <div className="flex flex-col sm:flex-row gap-5">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 flex-1">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                        <Image src={item.imageUrl} alt={item.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-gray-400">{item.brand}</p>
                        <p className="text-sm font-bold text-gray-900 mt-1">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-col gap-1 sm:min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={order.status} />
                      <span className="text-sm font-bold text-gray-900">{order.status}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {order.status === "Delivered"
                        ? `Delivered on ${order.date}`
                        : order.status === "Cancelled"
                        ? "Cancelled at your request"
                        : `Expected by ${order.expected}`}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FilterSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</span>
      {items.map((item) => (
        <label key={item} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input type="checkbox" className="w-3.5 h-3.5 accent-pp-primary" />
          {item}
        </label>
      ))}
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  if (status === "Delivered") return <CheckCircle2 className="w-4 h-4 text-pp-success" />;
  if (status === "Cancelled") return <XCircle className="w-4 h-4 text-pp-accent" />;
  return <Truck className="w-4 h-4 text-pp-primary" />;
}
