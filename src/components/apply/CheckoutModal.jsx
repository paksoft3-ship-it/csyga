"use client";
import { useState } from "react";

const REVOLUT_LINK = "https://checkout.revolut.com/payment-link/39be6362-9836-4069-b627-3c8c3af46832";

export default function CheckoutModal({ formData, onPay, submitting, submitError, onClose }) {
    const [paymentMethod, setPaymentMethod] = useState("card");

    const nameParts = (formData.name || "").trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName  = nameParts.slice(1).join(" ") || "";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal card */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto">

                {/* ── Header ──────────────────────────────────────────── */}
                <div
                    className="relative text-center py-7 px-8 rounded-t-2xl overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #111821 60%, #195eb3 100%)" }}
                >
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-white/60 hover:text-white transition"
                        aria-label="Close"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <h2 className="text-2xl font-black tracking-[0.2em] uppercase text-white">
                        Checkout
                    </h2>
                </div>

                <div className="p-6 md:p-8">

                    {/* ── Payment notice ───────────────────────────────── */}
                    <div className="mb-6">
                        <p className="font-bold text-gray-900 mb-1">Payment for Application Processing Fee</p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Please proceed with the Application Fee payment to complete your submission.
                            Your payment details and personal information will be secured and processed
                            in compliance with the General Data Protection Regulation (GDPR), ensuring
                            the highest level of data privacy and security. Should you have any questions
                            regarding the payment, feel free to contact us at{" "}
                            <a href="mailto:Thecsyga@gmail.com" className="text-[#195eb3] hover:underline">
                                Thecsyga@gmail.com
                            </a>
                        </p>
                    </div>

                    {/* ── Express pay buttons ──────────────────────────── */}
                    <div className="flex gap-3 mb-5">
                        <a
                            href={REVOLUT_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-black text-white py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition"
                        >
                            <svg width="18" height="18" viewBox="0 0 814 1000" fill="white"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.8-155.5-127.4C46 790.9 0 663.6 0 541.8c0-207.4 135.4-317.3 268.8-317.3 99.5 0 162.1 51.9 221.5 51.9 57.5 0 130.3-56.7 241.7-56.7 44.6 0 176.3 4.5 262.6 144.7zm-197.5-175.7c43.4-53.1 72.9-126.8 72.9-200.5 0-10.2-.6-20.4-2.6-29.4-69.4 2.6-151.6 46.4-201.9 106.1-39.6 45.5-75.7 120.5-75.7 195.5 0 11.5 1.9 23 2.6 26.9 5.2.6 13.4 1.9 21.7 1.9 62.2 0 134.2-42.1 182.9-100.5z"/></svg>
                            Apple Pay
                        </a>
                        <a
                            href={REVOLUT_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-white border border-gray-300 text-gray-800 py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.5 7.2l-1.9 9c-.1.5-.5.7-.9.5l-2.6-2-1.3 1.2c-.1.1-.3.2-.6.2l.2-2.7 5.1-4.6c.2-.2 0-.3-.3-.1L6.3 13.7 3.8 13c-.5-.2-.5-.5.1-.7l10.7-4.1c.4-.2.9.1.9.7v.3z" fill="#4285F4"/></svg>
                            G Pay
                        </a>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-1 border-t border-gray-200" />
                        <span className="text-xs text-gray-400 font-medium">—or—</span>
                        <div className="flex-1 border-t border-gray-200" />
                    </div>

                    {/* ── Main two-column layout ───────────────────────── */}
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* LEFT — Applicant details + payment method */}
                        <div>
                            <h3 className="text-xs font-black tracking-widest text-gray-500 uppercase mb-4">
                                Enter Your Details
                            </h3>
                            <div className="space-y-3 mb-6">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs text-gray-500 font-semibold">First Name *</label>
                                        <input
                                            readOnly
                                            value={firstName}
                                            placeholder="First Name"
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-700 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 font-semibold">Last Name *</label>
                                        <input
                                            readOnly
                                            value={lastName}
                                            placeholder="Last Name"
                                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-700 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-semibold">Phone *</label>
                                    <input
                                        readOnly
                                        value={formData.phone}
                                        placeholder="Phone"
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-700 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 font-semibold">Email Address *</label>
                                    <input
                                        readOnly
                                        value={formData.email}
                                        placeholder="Email Address"
                                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-700 outline-none"
                                    />
                                </div>
                            </div>

                            {/* Payment method selector */}
                            <h3 className="text-xs font-black tracking-widest text-gray-500 uppercase mb-3">
                                Payment Method
                            </h3>
                            <div className="space-y-2">
                                <label
                                    className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition ${paymentMethod === "card" ? "border-[#195eb3] bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={paymentMethod === "card"}
                                        onChange={() => setPaymentMethod("card")}
                                        className="accent-[#195eb3]"
                                    />
                                    <span className="material-symbols-outlined text-[20px] text-gray-600">credit_card</span>
                                    <span className="text-sm font-semibold text-gray-700">Credit / Debit Card</span>
                                    <div className="ml-auto flex gap-1">
                                        <span className="bg-[#1a1f71] text-white text-[9px] font-black px-1.5 py-0.5 rounded">VISA</span>
                                        <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">MC</span>
                                    </div>
                                </label>
                                <label
                                    className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition ${paymentMethod === "paypal" ? "border-[#195eb3] bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={paymentMethod === "paypal"}
                                        onChange={() => setPaymentMethod("paypal")}
                                        className="accent-[#195eb3]"
                                    />
                                    <span className="text-sm font-black text-[#003087]">Pay<span className="text-[#009cde]">Pal</span></span>
                                </label>
                            </div>

                            <p className="text-[11px] text-gray-400 mt-3 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px] text-green-500">lock</span>
                                Secure, fast checkout — you will complete payment on our secure payment partner&apos;s page.
                            </p>
                        </div>

                        {/* RIGHT — Application summary + pay button */}
                        <div>
                            <h3 className="text-xs font-black tracking-widest text-gray-500 uppercase mb-4">
                                Your Application
                            </h3>

                            <table className="w-full text-sm mb-4">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-2 font-semibold text-gray-500 text-xs">Product</th>
                                        <th className="text-right py-2 font-semibold text-gray-500 text-xs">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 text-gray-700 leading-snug">
                                            Fully Funded Form<br />
                                            <span className="text-xs text-gray-400">Digital Diplomacy Summit 2026 × 1</span>
                                        </td>
                                        <td className="py-3 text-right font-semibold text-gray-800">$9.99</td>
                                    </tr>
                                    <tr className="border-b border-gray-100">
                                        <td className="py-3 text-gray-500 text-xs">Service Charges, VAT &amp; Processing Fee</td>
                                        <td className="py-3 text-right text-gray-500 text-xs">$0.00</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 font-black text-gray-900">Total</td>
                                        <td className="py-3 text-right font-black text-gray-900 text-lg">$9.99</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Error */}
                            {submitError && (
                                <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-xs mb-4">
                                    <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">error</span>
                                    <span>{submitError}</span>
                                </div>
                            )}

                            {/* Pay button */}
                            <button
                                onClick={onPay}
                                disabled={submitting}
                                className={`w-full py-4 rounded-xl font-black text-white text-base transition shadow-md flex items-center justify-center gap-2 ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#2ec27e] hover:bg-[#27ae6e]"}`}
                            >
                                {submitting
                                    ? <><span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> Processing...</>
                                    : <><span className="material-symbols-outlined text-[20px]">payment</span> Pay &amp; Submit your application</>
                                }
                            </button>

                            <p className="text-[10px] text-center text-gray-400 mt-2">
                                By clicking above you agree to our Terms &amp; Conditions and confirm this is a non-refundable fee.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
