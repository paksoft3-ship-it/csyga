"use client";

import { useEffect, useState } from "react";

const REVOLUT_LINK = "https://checkout.revolut.com/payment-link/39be6362-9836-4069-b627-3c8c3af46832";

export default function PaymentMethods() {
    const [applicant, setApplicant] = useState({ name: "", email: "", phone: "" });
    const [iframeBlocked, setIframeBlocked] = useState(false);

    useEffect(() => {
        try {
            const saved = sessionStorage.getItem("csyga_applicant");
            if (saved) setApplicant(JSON.parse(saved));
        } catch (_) {}
    }, []);

    const nameParts = (applicant.name || "").trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName  = nameParts.slice(1).join(" ") || "";

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* ── Header ─────────────────────────────────────────────── */}
            <div
                className="rounded-t-3xl text-center py-8"
                style={{ background: "linear-gradient(135deg, #111821 60%, #195eb3 100%)" }}
            >
                <h1 className="text-3xl font-black tracking-[0.2em] uppercase text-white">Checkout</h1>
            </div>

            <div className="bg-white rounded-b-3xl shadow-2xl border border-gray-100 px-6 md:px-10 py-8 space-y-6">

                {/* ── Payment notice ──────────────────────────────────── */}
                <div className="border-b border-gray-100 pb-6">
                    <p className="font-bold text-gray-900 mb-1 text-sm">Payment for Application Processing Fee</p>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-3xl">
                        Please proceed with the Application Fee payment to complete your submission. Your payment details
                        and personal information will be secured and processed in compliance with the General Data
                        Protection Regulation (GDPR), ensuring the highest level of data privacy and security. Should you
                        have any questions regarding the payment, feel free to contact us at{" "}
                        <a href="mailto:Thecsyga@gmail.com" className="text-[#195eb3] hover:underline font-medium">
                            Thecsyga@gmail.com
                        </a>
                    </p>
                </div>

                {/* ── Express pay ─────────────────────────────────────── */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <a href={REVOLUT_LINK} target="_blank" rel="noopener noreferrer"
                        className="flex-1 bg-black text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition shadow">
                        <svg width="16" height="16" viewBox="0 0 814 1000" fill="white"><path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.8-155.5-127.4C46 790.9 0 663.6 0 541.8c0-207.4 135.4-317.3 268.8-317.3 99.5 0 162.1 51.9 221.5 51.9 57.5 0 130.3-56.7 241.7-56.7 44.6 0 176.3 4.5 262.6 144.7zm-197.5-175.7c43.4-53.1 72.9-126.8 72.9-200.5 0-10.2-.6-20.4-2.6-29.4-69.4 2.6-151.6 46.4-201.9 106.1-39.6 45.5-75.7 120.5-75.7 195.5 0 11.5 1.9 23 2.6 26.9 5.2.6 13.4 1.9 21.7 1.9 62.2 0 134.2-42.1 182.9-100.5z"/></svg>
                        Apple Pay
                    </a>
                    <a href={REVOLUT_LINK} target="_blank" rel="noopener noreferrer"
                        className="flex-1 bg-white border border-gray-300 text-gray-800 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow">
                        <svg width="18" height="18" viewBox="0 0 186.69 190.5" xmlns="http://www.w3.org/2000/svg"><g transform="translate(1184.583 765.171)"><path d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.484z" fill="#4285f4"/><path d="M-1142.714-651.791l-6.972 5.337-24.679 19.223c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853"/><path d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05"/><path d="M-1142.714-689.905c13.034-12.467 29.744-19.48 48.542-19.48 18.882 0 35.498 6.498 48.706 19.135l28.672-28.671c-18.189-16.899-41.83-27.243-77.378-27.243-37.234 0-69.271 21.388-85.03 52.561z" fill="#ea4335"/></g></svg>
                        G Pay
                    </a>
                    <a href={REVOLUT_LINK} target="_blank" rel="noopener noreferrer"
                        className="flex-1 bg-[#191C1F] text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-black transition shadow">
                        <span className="text-[#F13C3C] font-black text-lg">R</span>
                        Revolut Pay
                    </a>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex-1 border-t border-gray-200" />
                    <span className="text-xs text-gray-400 font-medium px-2">— or pay below —</span>
                    <div className="flex-1 border-t border-gray-200" />
                </div>

                {/* ── Two-column: details + summary ───────────────────── */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* LEFT — Applicant details */}
                    <div>
                        <h3 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-4">Enter Your Details</h3>
                        <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500">First Name *</label>
                                    <input readOnly value={firstName} placeholder="First Name"
                                        className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-700 outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500">Last Name *</label>
                                    <input readOnly value={lastName} placeholder="Last Name"
                                        className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-700 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500">Phone *</label>
                                <input readOnly value={applicant.phone} placeholder="Phone"
                                    className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-700 outline-none" />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-500">Email Address *</label>
                                <input readOnly value={applicant.email} placeholder="Email Address"
                                    className="w-full mt-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-700 outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT — Application summary + pay button */}
                    <div>
                        <h3 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-4">Your Application</h3>
                        <table className="w-full text-sm mb-5">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 text-xs font-semibold text-gray-400">Product</th>
                                    <th className="text-right py-2 text-xs font-semibold text-gray-400">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="py-3 text-gray-700 leading-snug">
                                        Fully Funded Form<br />
                                        <span className="text-xs text-gray-400">Digital Diplomacy Summit 2026 × 1</span>
                                    </td>
                                    <td className="py-3 text-right font-semibold">$9.99</td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="py-3 text-xs text-gray-400">Service Charges, VAT &amp; Processing Fee</td>
                                    <td className="py-3 text-right text-xs text-gray-400">$0.00</td>
                                </tr>
                                <tr>
                                    <td className="py-3 font-black text-gray-900">Total</td>
                                    <td className="py-3 text-right font-black text-gray-900 text-xl">$9.99</td>
                                </tr>
                            </tbody>
                        </table>

                        <a
                            href={REVOLUT_LINK}
                            className="w-full py-4 rounded-xl font-black text-white text-base bg-[#2ec27e] hover:bg-[#27ae6e] transition shadow-md flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[20px]">payment</span>
                            Pay &amp; Submit your application
                        </a>
                        <p className="text-[10px] text-center text-gray-400 mt-2">
                            By clicking above you confirm this is a non-refundable $9.99 USD fee.
                        </p>
                    </div>
                </div>

                {/* ── Embedded Revolut payment window ─────────────────── */}
                <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-xs font-black tracking-widest text-gray-400 uppercase mb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px] text-green-500">lock</span>
                        Secure Payment Window
                    </h3>

                    {iframeBlocked ? (
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
                            <span className="material-symbols-outlined text-4xl text-gray-300 mb-3 block">open_in_new</span>
                            <p className="text-gray-600 text-sm mb-4">
                                The payment window could not be embedded. Click below to complete your payment securely on Revolut.
                            </p>
                            <a
                                href={REVOLUT_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#2ec27e] hover:bg-[#27ae6e] text-white font-bold px-8 py-3 rounded-full transition shadow-md"
                            >
                                <span className="material-symbols-outlined text-[18px]">payment</span>
                                Open Secure Payment Page
                            </a>
                        </div>
                    ) : (
                        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-gray-50">
                            <iframe
                                src={REVOLUT_LINK}
                                className="w-full"
                                style={{ height: "600px", border: "none" }}
                                title="Secure Payment"
                                onError={() => setIframeBlocked(true)}
                                sandbox="allow-scripts allow-forms allow-same-origin allow-top-navigation allow-popups"
                            />
                        </div>
                    )}
                </div>

                {/* ── Security footer ─────────────────────────────────── */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-2 border-t border-gray-100">
                    <span className="material-symbols-outlined text-[14px] text-green-500">lock</span>
                    Secure, fast checkout powered by Revolut — 256-bit SSL encrypted
                </div>

            </div>
        </div>
    );
}
