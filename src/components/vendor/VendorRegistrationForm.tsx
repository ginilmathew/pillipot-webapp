'use client';

import { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { registerVendor } from '@/lib/api';

interface FormData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessAddress: string;
  city: string;
  state: string;
  pincode: string;
  panNumber: string;
  gstNumber: string;
  bankAccountNumber: string;
  ifscCode: string;
}

const initialFormData: FormData = {
  businessName: '',
  ownerName: '',
  email: '',
  phone: '',
  businessAddress: '',
  city: '',
  state: '',
  pincode: '',
  panNumber: '',
  gstNumber: '',
  bankAccountNumber: '',
  ifscCode: '',
};

export default function VendorRegistrationForm() {
  const toast = useToast();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = (stepNum: number): boolean => {
    if (stepNum === 1) {
      if (!formData.businessName.trim()) {
        toast.error('Business name is required');
        return false;
      }
      if (!formData.ownerName.trim()) {
        toast.error('Owner name is required');
        return false;
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error('Valid email is required');
        return false;
      }
      if (!formData.phone.trim() || !/^[\d+\-\s()]{10,}$/.test(formData.phone)) {
        toast.error('Valid phone number is required');
        return false;
      }
    } else if (stepNum === 2) {
      if (!formData.businessAddress.trim()) {
        toast.error('Business address is required');
        return false;
      }
      if (!formData.city.trim()) {
        toast.error('City is required');
        return false;
      }
      if (!formData.state.trim()) {
        toast.error('State is required');
        return false;
      }
      if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode)) {
        toast.error('Valid 6-digit pincode is required');
        return false;
      }
    } else if (stepNum === 3) {
      if (!formData.panNumber.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
        toast.error('Valid PAN number is required (e.g., AAAPD5055K)');
        return false;
      }
      if (!formData.gstNumber.trim() || !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
        toast.error('Valid GST number is required');
        return false;
      }
    } else if (stepNum === 4) {
      if (!formData.bankAccountNumber.trim()) {
        toast.error('Bank account number is required');
        return false;
      }
      if (!formData.ifscCode.trim() || !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
        toast.error('Valid IFSC code is required (e.g., HDFC0000001)');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setSubmitting(true);
    try {
      const payload = {
        businessName: formData.businessName,
        ownerName: formData.ownerName,
        email: formData.email,
        phoneNumber: formData.phone,
        gstNumber: formData.gstNumber,
        panNumber: formData.panNumber,
        address: `${formData.businessAddress}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        bankAccountNumber: formData.bankAccountNumber,
        ifscCode: formData.ifscCode,
      };

      await registerVendor(payload);

      toast.success('Registration successful! Check your email for next steps.');
      setFormData(initialFormData);
      setStep(1);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const progressPercent = (step / 4) * 100;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-0.5">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-1 items-center gap-0.5">
              <div
                className={`h-2 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-pp-primary' : 'bg-slate-200'
                }`}
              />
              {s < 4 && (
                <div className={`h-2 w-2 rounded-full transition-colors ${s < step ? 'bg-pp-primary' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-sm font-medium text-slate-600">Step {step} of 4</p>
      </div>

      {/* Step 1: Business & Personal Info */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-950">Business & Personal Information</h3>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Your business name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-pp-primary focus:outline-none focus:ring-2 focus:ring-pp-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Owner Name</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-pp-primary focus:outline-none focus:ring-2 focus:ring-pp-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-pp-primary focus:outline-none focus:ring-2 focus:ring-pp-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXXXXXXX"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-pp-primary focus:outline-none focus:ring-2 focus:ring-pp-primary/20"
            />
          </div>
        </div>
      )}

      {/* Step 2: Address Info */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-950">Business Address</h3>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Business Address</label>
            <textarea
              name="businessAddress"
              value={formData.businessAddress}
              onChange={handleChange}
              placeholder="Enter your business address"
              rows={3}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-pp-primary focus:outline-none focus:ring-2 focus:ring-pp-primary/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Mumbai"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-pp-primary focus:outline-none focus:ring-2 focus:ring-pp-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Maharashtra"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-pp-primary focus:outline-none focus:ring-2 focus:ring-pp-primary/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="400001"
              maxLength={6}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-pp-primary focus:outline-none focus:ring-2 focus:ring-pp-primary/20"
            />
          </div>
        </div>
      )}

      {/* Step 3: Tax & Compliance */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-950">Tax & Compliance</h3>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">PAN Number</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="AAAPD5055K"
              maxLength={10}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-pp-primary focus:outline-none focus:ring-2 focus:ring-pp-primary/20 uppercase"
            />
            <p className="mt-1 text-xs text-slate-500">Format: 5 letters + 4 digits + 1 letter</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">GST Number</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="18AABCA1234B1Z5"
              maxLength={15}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-pp-primary focus:outline-none focus:ring-2 focus:ring-pp-primary/20 uppercase"
            />
            <p className="mt-1 text-xs text-slate-500">15-digit GST registration number</p>
          </div>
        </div>
      )}

      {/* Step 4: Bank Details */}
      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-950">Bank Details</h3>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Bank Account Number</label>
            <input
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              placeholder="1234567890123456"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-pp-primary focus:outline-none focus:ring-2 focus:ring-pp-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              placeholder="HDFC0000001"
              maxLength={11}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-pp-primary focus:outline-none focus:ring-2 focus:ring-pp-primary/20 uppercase"
            />
            <p className="mt-1 text-xs text-slate-500">11-character bank IFSC code</p>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="mt-8 flex gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={handlePrev}
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Previous
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 rounded-lg bg-pp-primary px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 rounded-lg bg-pp-primary px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Registering...' : 'Complete Registration'}
          </button>
        )}
      </div>
    </form>
  );
}
