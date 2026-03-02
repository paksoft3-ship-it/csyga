"use client";
import { useState, useRef } from "react";

const REVOLUT_LINK = "https://checkout.revolut.com/payment-link/39be6362-9836-4069-b627-3c8c3af46832";

export default function Step4Payment({ prevStep, onSubmit, submitting, submitError }) {
    const [paymentOpened, setPaymentOpened] = useState(false);
    const [receipt, setReceipt] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const openPayment = () => {
        window.open(REVOLUT_LINK, "_blank", "noopener,noreferrer");
        setPaymentOpened(true);
    };

    const handleFile = (file) => {
        if (!file) return;
        const allowed = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
        if (!allowed.includes(file.type)) {
            alert("Please upload a JPG, PNG, WEBP, or PDF file.");
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("File must be smaller than 10 MB.");
            return;
        }
        setReceipt(file);
    };

    const onFileInput = (e) => handleFile(e.target.files?.[0]);

    const onDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files?.[0]);
    };

    const canSubmit = !!receipt && !submitting;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Complete Your Payment</h2>
                <p className="text-gray-500 text-sm">
                    Pay the $9.99 registration fee, then upload your receipt to submit your application
                </p>
            </div>

            {/* ── Step indicator ────────────────────────────────────── */}
            <div className="max-w-md mx-auto flex items-center gap-0">
                <div className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-[#195eb3] text-white flex items-center justify-center text-sm font-bold">1</div>
                    <p className="text-[11px] font-semibold text-[#195eb3] text-center">Pay via Revolut</p>
                </div>
                <div className="flex-1 border-t-2 border-dashed border-gray-300 mb-4" />
                <div className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${paymentOpened ? "bg-[#195eb3] text-white" : "bg-gray-100 text-gray-400 border border-gray-200"}`}>2</div>
                    <p className={`text-[11px] font-semibold text-center ${paymentOpened ? "text-[#195eb3]" : "text-gray-400"}`}>Upload Receipt</p>
                </div>
                <div className="flex-1 border-t-2 border-dashed border-gray-300 mb-4" />
                <div className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${receipt ? "bg-[#2ec27e] text-white" : "bg-gray-100 text-gray-400 border border-gray-200"}`}>3</div>
                    <p className={`text-[11px] font-semibold text-center ${receipt ? "text-[#2ec27e]" : "text-gray-400"}`}>Submit</p>
                </div>
            </div>

            {/* ── Revolut-style payment card ────────────────────────── */}
            <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">

                {/* Amount header */}
                <div className="px-6 pt-6 pb-4">
                    <p className="text-2xl font-black text-gray-900">Pay $9.99</p>
                    <p className="text-sm text-gray-500 mt-0.5 font-medium">
                        To CENTER FOR STRATEGIC YOUTH AND GLOBAL AFFAIRS LTD
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-snug">
                        Digital Diplomacy Summit 2026 — Istanbul Fully Funded Scholarship
                        (Early Access Registration)
                    </p>
                </div>

                <div className="border-t border-gray-100" />

                {/* Payment method list */}
                <div className="px-6 py-5 space-y-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                        Choose a payment method
                    </p>

                    {/* Revolut Pay */}
                    <button type="button" onClick={openPayment}
                        className="w-full flex items-center justify-between px-4 py-3.5 border border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1 items-center">
                                <svg width="32" height="20" viewBox="0 0 780 500" fill="none">
                                    <rect width="780" height="500" rx="40" fill="#1A1F71"/>
                                    <text x="120" y="320" fill="white" fontSize="230" fontWeight="bold" fontFamily="Arial">VISA</text>
                                </svg>
                                <svg width="28" height="20" viewBox="0 0 131.39 86.9" fill="none">
                                    <rect x="0" y="0" width="131.39" height="86.9" rx="6" fill="#252525"/>
                                    <circle cx="48.37" cy="43.45" r="27.23" fill="#eb001b"/>
                                    <circle cx="83.02" cy="43.45" r="27.23" fill="#f79e1b"/>
                                    <path d="M65.7 19.73a27.23 27.23 0 0 1 0 47.44A27.23 27.23 0 0 1 65.7 19.73z" fill="#ff5f00"/>
                                </svg>
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-sm text-gray-900">Revolut Pay</p>
                                <p className="text-[11px] text-gray-400">New users get up to $10</p>
                            </div>
                        </div>
                        <span className="bg-[#191C1F] text-white text-xs font-bold px-3 py-1.5 rounded-full shrink-0">Revolut Pay</span>
                    </button>

                    {/* Credit / debit card */}
                    <button type="button" onClick={openPayment}
                        className="w-full flex items-center justify-between px-4 py-3.5 border border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1 items-center">
                                <svg width="32" height="20" viewBox="0 0 780 500" fill="none">
                                    <rect width="780" height="500" rx="40" fill="#1A1F71"/>
                                    <text x="120" y="320" fill="white" fontSize="230" fontWeight="bold" fontFamily="Arial">VISA</text>
                                </svg>
                                <svg width="28" height="20" viewBox="0 0 131.39 86.9" fill="none">
                                    <rect x="0" y="0" width="131.39" height="86.9" rx="6" fill="#252525"/>
                                    <circle cx="48.37" cy="43.45" r="27.23" fill="#eb001b"/>
                                    <circle cx="83.02" cy="43.45" r="27.23" fill="#f79e1b"/>
                                    <path d="M65.7 19.73a27.23 27.23 0 0 1 0 47.44A27.23 27.23 0 0 1 65.7 19.73z" fill="#ff5f00"/>
                                </svg>
                            </div>
                            <p className="font-semibold text-sm text-gray-900">Credit or debit card</p>
                        </div>
                        <span className="border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shrink-0">Pay with card</span>
                    </button>

                    {/* Apple Pay */}
                    <button type="button" onClick={openPayment}
                        className="w-full flex items-center justify-between px-4 py-3.5 border border-gray-200 rounded-xl hover:border-gray-900 hover:bg-gray-50 transition-all">
                        <p className="font-semibold text-sm text-gray-900">Apple Pay</p>
                        <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0">
                            <svg width="11" height="13" viewBox="0 0 814 1000" fill="white">
                                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.8-155.5-127.4C46 790.9 0 663.6 0 541.8c0-207.4 135.4-317.3 268.8-317.3 99.5 0 162.1 51.9 221.5 51.9 57.5 0 130.3-56.7 241.7-56.7 44.6 0 176.3 4.5 262.6 144.7zm-197.5-175.7c43.4-53.1 72.9-126.8 72.9-200.5 0-10.2-.6-20.4-2.6-29.4-69.4 2.6-151.6 46.4-201.9 106.1-39.6 45.5-75.7 120.5-75.7 195.5 0 11.5 1.9 23 2.6 26.9 5.2.6 13.4 1.9 21.7 1.9 62.2 0 134.2-42.1 182.9-100.5z"/>
                            </svg>
                            Pay
                        </span>
                    </button>

                    {/* Google Pay */}
                    <button type="button" onClick={openPayment}
                        className="w-full flex items-center justify-between px-4 py-3.5 border border-gray-200 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all">
                        <p className="font-semibold text-sm text-gray-900">Google Pay</p>
                        <span className="bg-white border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0">
                            <svg width="12" height="12" viewBox="0 0 186.69 190.5" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(1184.583 765.171)">
                                    <path d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.484z" fill="#4285f4"/>
                                    <path d="M-1142.714-651.791l-6.972 5.337-24.679 19.223c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z" fill="#34a853"/>
                                    <path d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z" fill="#fbbc05"/>
                                    <path d="M-1142.714-689.905c13.034-12.467 29.744-19.48 48.542-19.48 18.882 0 35.498 6.498 48.706 19.135l28.672-28.671c-18.189-16.899-41.83-27.243-77.378-27.243-37.234 0-69.271 21.388-85.03 52.561z" fill="#ea4335"/>
                                </g>
                            </svg>
                            Pay
                        </span>
                    </button>
                </div>

                <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 text-center">
                    <p className="text-[11px] text-gray-400">
                        Northampton, United Kingdom &nbsp;·&nbsp; Powered by{" "}
                        <span className="font-bold text-gray-600">Revolut</span> Business
                    </p>
                </div>
            </div>

            {/* ── Receipt upload — appears after payment opened ─────── */}
            <div className={`max-w-md mx-auto transition-all duration-300 ${paymentOpened ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-4">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-blue-500 text-[22px] shrink-0 mt-0.5">info</span>
                        <div>
                            <p className="text-sm font-bold text-blue-800">Payment completed?</p>
                            <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
                                After paying in the Revolut tab, download or screenshot your
                                payment confirmation and upload it below. Your application
                                will only be submitted once we receive proof of payment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Drop zone */}
                {receipt ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-300 rounded-2xl px-5 py-4">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-green-600 text-[28px]">
                                {receipt.type === "application/pdf" ? "picture_as_pdf" : "image"}
                            </span>
                            <div>
                                <p className="text-sm font-bold text-green-800 truncate max-w-[200px]">{receipt.name}</p>
                                <p className="text-xs text-green-600">{(receipt.size / 1024).toFixed(0)} KB — ready to submit</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => { setReceipt(null); fileInputRef.current.value = ""; }}
                            className="text-gray-400 hover:text-red-500 transition"
                            title="Remove file"
                        >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={onDrop}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragOver ? "border-[#195eb3] bg-blue-50" : "border-gray-300 hover:border-[#195eb3] hover:bg-gray-50"}`}
                    >
                        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2 block">upload_file</span>
                        <p className="text-sm font-bold text-gray-700">Upload Payment Receipt</p>
                        <p className="text-xs text-gray-400 mt-1">
                            Drag & drop or click to select
                        </p>
                        <p className="text-[11px] text-gray-300 mt-2">JPG, PNG, WEBP or PDF · max 10 MB</p>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    className="hidden"
                    onChange={onFileInput}
                />
            </div>

            {!paymentOpened && (
                <p className="text-center text-xs text-gray-400 -mt-4">
                    Select a payment method above first — the receipt upload will unlock.
                </p>
            )}

            {/* ── Error ────────────────────────────────────────────── */}
            {submitError && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
                    <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">error</span>
                    <span>{submitError}</span>
                </div>
            )}

            {/* ── Nav buttons ──────────────────────────────────────── */}
            <div className="flex justify-between pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={prevStep}
                    disabled={submitting}
                    className="bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition shadow-sm disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={() => onSubmit(receipt)}
                    disabled={!canSubmit}
                    className={`px-8 py-3 rounded-full font-bold transition shadow-md flex items-center gap-2 ${canSubmit ? "bg-[#2ec27e] hover:bg-[#27ae6e] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                    {submitting ? (
                        <>
                            <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                            Submitting…
                        </>
                    ) : (
                        <>
                            Submit My Application
                            <span className="material-symbols-outlined text-[18px]">send</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
