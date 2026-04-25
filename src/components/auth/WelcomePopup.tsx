"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface WelcomePopupProps {
  open: boolean;
  onClose: () => void;
}

export default function WelcomePopup({ open, onClose }: WelcomePopupProps) {
  const [zoomOpen, setZoomOpen] = useState(false);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="relative z-10 w-full max-w-2xl rounded-[32px] bg-white shadow-2xl overflow-hidden border border-slate-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full bg-slate-100 p-3 text-slate-600 hover:bg-slate-200 transition"
            aria-label="Close welcome popup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center p-8 lg:p-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full bg-pp-primary/10 px-4 py-2 text-sm font-semibold text-pp-primary">
                Welcome to Pillipot
              </div>
              <h2 className="text-3xl font-black text-slate-900">Your first login is complete!</h2>
              <p className="text-slate-600 leading-7">
                We&apos;ve saved this guide for your first visit. Close this popup once and we will not show it again.
              </p>
              <div className="space-y-3">
                <p className="text-slate-800 font-semibold">What you can do next:</p>
                <ul className="space-y-2 text-slate-600 list-disc list-inside">
                  <li>Browse products and add your favorites to the cart.</li>
                  <li>Check out quickly with saved login information.</li>
                  <li>Track your orders and view delivery updates.</li>
                </ul>
              </div>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-3xl bg-pp-primary px-6 py-3 text-sm font-bold text-white shadow-xl shadow-pp-primary/20 hover:bg-pp-primary-dark transition"
              >
                Start Shopping
              </button>
            </div>

            <div className="rounded-[28px] bg-slate-950/5 p-4 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="group relative block w-full max-w-[540px] cursor-zoom-in"
                aria-label="Open image zoom"
              >
                <img
                  src="/popupwindow.png"
                  alt="Welcome to Pillipot"
                  className="h-full max-h-[520px] w-full object-contain rounded-[24px] shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-4 mx-auto flex w-fit items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm opacity-90">
                  Click to zoom
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {zoomOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setZoomOpen(false)}
          />
          <div className="relative z-10 max-h-full w-full max-w-5xl overflow-hidden rounded-[32px] shadow-2xl">
            <button
              onClick={() => setZoomOpen(false)}
              className="absolute top-4 right-4 z-20 rounded-full bg-white/90 p-3 text-slate-700 hover:bg-white transition"
              aria-label="Close zoomed image"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src="/popupwindow.png"
              alt="Welcome to Pillipot"
              className="h-[calc(100vh-4rem)] w-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
