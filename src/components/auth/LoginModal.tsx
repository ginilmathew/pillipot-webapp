"use client";

import React, { useState } from "react";
import { X, Mail, Lock, Loader2, ArrowRight, AlertCircle, User as UserIcon, Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { login as loginApi, register as registerApi } from "@/lib/api";

export default function AuthModal() {
  const { 
    isLoginModalOpen, setIsLoginModalOpen, 
    isRegisterModalOpen, setIsRegisterModalOpen,
    login 
  } = useAuth();
  
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Synchronize internal view state with global modal state
  React.useEffect(() => {
    if (isLoginModalOpen) setIsLoginView(true);
    if (isRegisterModalOpen) setIsLoginView(false);
  }, [isLoginModalOpen, isRegisterModalOpen]);

  if (!isLoginModalOpen && !isRegisterModalOpen) return null;

  const handleClose = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setError(null);
  };

  const handleSwitch = () => {
    setError(null);
    if (isLoginView) {
      setIsLoginModalOpen(false);
      setIsRegisterModalOpen(true);
    } else {
      setIsRegisterModalOpen(false);
      setIsLoginModalOpen(true);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await loginApi(email, password);
      if (result) {
        login(result.accessToken, result.user);
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Backend expects email and phoneNumber
      const result = await registerApi({ 
        name, 
        email, 
        phoneNumber, 
        password 
      });
      if (result) {
        login(result.accessToken, result.user);
      } else {
        setError("Registration failed. Email or phone might already be in use.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-pp-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {isLoginView ? <Lock className="w-8 h-8 text-pp-primary" /> : <UserIcon className="w-8 h-8 text-pp-primary" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isLoginView ? "Sign in to continue" : "Create an account"}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {isLoginView 
                ? "Sign in to your account to add items to your cart and checkout." 
                : "Join Pillipot to start shopping and tracking your orders."}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={isLoginView ? handleLogin : handleRegister} className="space-y-4">
            {!isLoginView && (
              <>
                <div className="space-y-1.5 animate-in slide-in-from-top-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pp-primary transition-colors">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pp-primary/20 focus:border-pp-primary focus:bg-white transition-all text-sm"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5 animate-in slide-in-from-top-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pp-primary transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pp-primary/20 focus:border-pp-primary focus:bg-white transition-all text-sm"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email / Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pp-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pp-primary/20 focus:border-pp-primary focus:bg-white transition-all text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pp-primary transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pp-primary/20 focus:border-pp-primary focus:bg-white transition-all text-sm"
                  placeholder={isLoginView ? "Enter your password" : "Create a password"}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pp-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-pp-primary-dark shadow-lg shadow-pp-primary/20 hover:shadow-xl hover:shadow-pp-primary/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-4 h-14 translate-y-2 mb-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLoginView ? "Sign in" : "Create Account"} <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-500">
            {isLoginView ? "Don't have an account? " : "Already have an account? "}
            <button 
              onClick={handleSwitch}
              className="text-pp-primary font-bold hover:underline"
            >
              {isLoginView ? "Sign up for free" : "Sign in here"}
            </button>
          </p>
        </div>

        {/* Brand Bar */}
        <div className="bg-pp-primary/5 py-4 px-8 text-center border-t border-pp-primary/10">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pp-primary/40">Pillipot Marketplace</span>
        </div>
      </div>
    </div>
  );
}
