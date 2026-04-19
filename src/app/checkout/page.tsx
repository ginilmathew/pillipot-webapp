"use client";

import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Check, ShieldCheck, MapPin, CreditCard, Banknote, Smartphone } from "lucide-react";
import Image from "next/image";

type Step = "address" | "summary" | "payment";

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<Step>("address");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "home" as "home" | "work",
  });

  const formatPrice = (num: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(num);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep("summary");
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    clearCart();
    router.push("/order-success");
  };

  if (cart.length === 0 && activeStep !== "payment") {
    router.push("/cart");
    return null;
  }

  const steps = [
    { key: "address", label: "Address", num: 1 },
    { key: "summary", label: "Review", num: 2 },
    { key: "payment", label: "Payment", num: 3 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-pp-surface">
      <Header />

      <main className="flex-1 pp-container px-4 py-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, i) => (
            <React.Fragment key={step.key}>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  steps.findIndex(s => s.key === activeStep) >= i
                    ? "pp-gradient text-white shadow-md"
                    : "bg-gray-200 text-gray-500"
                }`}>
                  {steps.findIndex(s => s.key === activeStep) > i ? <Check className="w-4 h-4" /> : step.num}
                </div>
                <span className={`text-sm font-semibold hidden sm:block ${
                  steps.findIndex(s => s.key === activeStep) >= i ? "text-pp-primary" : "text-gray-400"
                }`}>{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-12 sm:w-24 h-0.5 rounded-full ${
                  steps.findIndex(s => s.key === activeStep) > i ? "bg-pp-primary" : "bg-gray-200"
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left */}
          <div className="flex-1 w-full">
            {/* Address Step */}
            {activeStep === "address" && (
              <div className="bg-white rounded-2xl border border-gray-100 pp-shadow overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-pp-primary" />
                  <h2 className="font-bold text-gray-900">Delivery Address</h2>
                </div>
                <form onSubmit={handleSubmitAddress} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Full Name" name="name" value={formData.name} onChange={handleInputChange} required />
                    <InputField label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} required maxLength={10} />
                    <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleInputChange} required maxLength={6} />
                    <InputField label="Locality" name="locality" value={formData.locality} onChange={handleInputChange} required />
                    <div className="md:col-span-2">
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Full Address (Area and Street)"
                        required
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl p-3.5 outline-none focus:border-pp-primary focus:ring-2 focus:ring-pp-primary/10 transition-all text-sm resize-none"
                      />
                    </div>
                    <InputField label="City / District" name="city" value={formData.city} onChange={handleInputChange} required />
                    <select
                      name="state"
                      value={formData.state}
                      onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                      className="border border-gray-200 rounded-xl p-3.5 outline-none focus:border-pp-primary bg-white text-sm"
                      required
                    >
                      <option value="">Select State</option>
                      {["Andhra Pradesh","Karnataka","Kerala","Maharashtra","Tamil Nadu","Telangana","Gujarat","Rajasthan","Delhi","Uttar Pradesh"].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <InputField label="Landmark (Optional)" name="landmark" value={formData.landmark} onChange={handleInputChange} />
                    <InputField label="Alternate Phone (Optional)" name="alternatePhone" value={formData.alternatePhone} onChange={handleInputChange} />
                  </div>

                  <div className="mt-6">
                    <p className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wider">Address Type</p>
                    <div className="flex gap-6">
                      {(["home", "work"] as const).map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
                          <input
                            type="radio"
                            name="addressType"
                            value={type}
                            checked={formData.addressType === type}
                            onChange={() => setFormData(p => ({ ...p, addressType: type }))}
                            className="w-4 h-4 accent-pp-primary"
                          />
                          {type === "home" ? "Home" : "Work"}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <button type="submit" className="pp-gradient text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
                      SAVE & CONTINUE
                    </button>
                    <button type="button" onClick={() => router.push("/cart")} className="text-gray-500 font-semibold text-sm hover:text-pp-primary">
                      Back to Cart
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Summary Step */}
            {activeStep === "summary" && (
              <div className="bg-white rounded-2xl border border-gray-100 pp-shadow overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">Order Summary</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Delivering to: <b>{formData.name}</b> — {formData.address}, {formData.city}, {formData.state} {formData.pincode}
                  </p>
                </div>
                <div className="divide-y divide-gray-50">
                  {cart.map((item) => (
                    <div key={item.id} className="p-5 flex gap-4 items-center">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                        <Image src={item.imageUrl || ""} alt={item.name} fill sizes="64px" className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="text-xs text-gray-500">Qty: {item.cartQuantity}</p>
                      </div>
                      <span className="font-bold text-gray-900">{formatPrice(item.price * item.cartQuantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="p-5 border-t border-gray-100 flex justify-end gap-4">
                  <button onClick={() => setActiveStep("address")} className="text-gray-500 font-semibold text-sm">Back</button>
                  <button
                    onClick={() => { setActiveStep("payment"); window.scrollTo(0, 0); }}
                    className="pp-gradient text-white px-10 py-3 rounded-xl font-bold shadow-lg"
                  >
                    PROCEED TO PAY
                  </button>
                </div>
              </div>
            )}

            {/* Payment Step */}
            {activeStep === "payment" && (
              <div className="bg-white rounded-2xl border border-gray-100 pp-shadow overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">Payment Method</h2>
                </div>
                <div className="p-5 space-y-3">
                  <PaymentOption icon={Smartphone} id="upi" label="UPI" subtitle="Google Pay, PhonePe, Paytm" disabled />
                  <PaymentOption icon={CreditCard} id="card" label="Credit / Debit Card" subtitle="Visa, Mastercard, RuPay" disabled />

                  <div className="border-2 border-pp-primary bg-violet-50/30 rounded-xl p-5 cursor-pointer">
                    <div className="flex items-start gap-4">
                      <input type="radio" name="payment" id="cod" className="w-4 h-4 accent-pp-primary mt-1" defaultChecked />
                      <div className="flex flex-col gap-1 flex-1">
                        <label htmlFor="cod" className="text-sm font-bold text-gray-900 cursor-pointer flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-pp-primary" />
                          Cash on Delivery
                        </label>
                        <span className="text-xs text-pp-success font-semibold">No extra charges</span>
                        <button
                          onClick={handlePlaceOrder}
                          className="mt-4 pp-gradient text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all w-fit"
                        >
                          CONFIRM ORDER — {formatPrice(cartTotal)}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Price */}
          <div className="lg:w-[340px] w-full sticky top-20">
            <div className="bg-white rounded-2xl border border-gray-100 pp-shadow overflow-hidden">
              <h2 className="text-xs font-bold text-gray-400 tracking-widest p-5 border-b border-gray-100 uppercase">Price Details</h2>
              <div className="p-5 space-y-3 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>{formatPrice(cartTotal + cartTotal * 0.2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Discount</span>
                  <span className="text-pp-success font-semibold">- {formatPrice(cartTotal * 0.2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Delivery</span>
                  <span className="text-pp-success font-semibold">Free</span>
                </div>
                <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function InputField({ label, name, value, onChange, required = false, maxLength }: any) {
  return (
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      placeholder={label}
      className="border border-gray-200 rounded-xl p-3.5 outline-none focus:border-pp-primary focus:ring-2 focus:ring-pp-primary/10 transition-all text-sm w-full"
    />
  );
}

function PaymentOption({ icon: Icon, id, label, subtitle, disabled }: any) {
  return (
    <div className={`border border-gray-200 rounded-xl p-4 ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:border-pp-primary"}`}>
      <div className="flex items-start gap-4">
        <input type="radio" name="payment" id={id} disabled={disabled} className="w-4 h-4 mt-1 accent-pp-primary" />
        <div className="flex flex-col gap-0.5">
          <label htmlFor={id} className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Icon className="w-4 h-4" />
            {label}
          </label>
          {subtitle && <span className="text-xs text-gray-400">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}
