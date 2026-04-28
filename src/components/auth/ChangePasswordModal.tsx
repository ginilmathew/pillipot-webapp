"use client";

import React, { useEffect, useState } from "react";
import { LuCircleAlert, LuLoaderCircle, LuLock, LuLogOut, LuShieldCheck } from "react-icons/lu";
import { changePasswordApi } from "@/lib/api";

export default function ChangePasswordModal({
  open,
  token,
  onLogout,
  onPasswordChanged,
}: {
  open: boolean;
  token: string | null;
  onLogout: () => void;
  onPasswordChanged: () => Promise<void> | void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
    setSuccess(null);
    setLoading(false);
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!token) {
      setError("You are not logged in. Please sign in again.");
      return;
    }
    if (!currentPassword.trim()) {
      setError("Current password is required.");
      return;
    }
    if (newPassword.trim().length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    if (newPassword === currentPassword) {
      setError("New password must be different from the current password.");
      return;
    }

    setLoading(true);
    try {
      const res = await changePasswordApi(token, currentPassword, newPassword);
      if (res?.success) {
        setSuccess("Password updated successfully.");
        await onPasswordChanged();
      } else {
        setError("Failed to update password. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-pp-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LuShieldCheck className="w-8 h-8 text-pp-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
            <p className="text-gray-500 mt-2 text-sm">
              For security, you must change your temporary password to continue.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-sm">
              <LuCircleAlert className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl text-green-700 text-sm">
              <p>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Current Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pp-primary transition-colors">
                  <LuLock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pp-primary/20 focus:border-pp-primary focus:bg-white transition-all text-sm"
                  placeholder="Enter the temporary password"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pp-primary transition-colors">
                  <LuLock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pp-primary/20 focus:border-pp-primary focus:bg-white transition-all text-sm"
                  placeholder="Create a new password"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-pp-primary transition-colors">
                  <LuLock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pp-primary/20 focus:border-pp-primary focus:bg-white transition-all text-sm"
                  placeholder="Re-enter the new password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pp-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-pp-primary-dark shadow-lg shadow-pp-primary/20 hover:shadow-xl hover:shadow-pp-primary/30 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-4 h-14"
            >
              {loading ? <LuLoaderCircle className="w-5 h-5 animate-spin" /> : "Update Password"}
            </button>
          </form>

          <button
            type="button"
            onClick={onLogout}
            className="mt-6 w-full text-gray-500 hover:text-gray-800 text-sm font-semibold flex items-center justify-center gap-2"
          >
            <LuLogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

