"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const REVOLUT_LINK = "https://checkout.revolut.com/payment-link/53c90abb-e5a6-4e9b-a692-9dfd42087cb4";

export default function Step4Payment({ prevStep, formData }) {
    const router = useRouter();
    const [receipt, setReceipt] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const fileInputRef = useRef(null);

    const handleReceiptChange = (e) => {
        const file = e.target.files?.[0] || null;
        setReceipt(file);
        setErrorMsg("");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0] || null;
        if (file) {
            setReceipt(file);
            setErrorMsg("");
        }
    };

    const handleSubmit = async () => {
        if (!receipt) {
            setErrorMsg("Please upload your payment receipt before submitting.");
            return;
        }

        setSubmitting(true);
        setErrorMsg("");

        try {
            const payload = new FormData();
            payload.append("name",               formData.name);
            payload.append("email",              formData.email);
            payload.append("phone",              formData.phone);
            payload.append("city",               formData.city);
            payload.append("nationality",        formData.nationality);
            payload.append("passportNumber",     formData.passportNumber);
            payload.append("dob",                formData.dob);
            payload.append("gender",             formData.gender);
            payload.append("isStudent",          formData.isStudent);
            payload.append("hasVolunteerExp",    formData.hasVolunteerExp);
            payload.append("organizations",      formData.organizations);
            payload.append("statementOfPurpose", formData.statementOfPurpose);
            payload.append("socialCauses",       Array.isArray(formData.socialCauses)
                ? formData.socialCauses.join(", ")
                : formData.socialCauses || "");
            if (formData.headshot) payload.append("headshot", formData.headshot);
            if (formData.resume)   payload.append("resume",   formData.resume);
            payload.append("paymentReceipt", receipt);

            const res = await fetch("/api/send-application", {
                method: "POST",
                body: payload,
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "Submission failed. Please try again.");
            }

            router.push("/apply/success");
        } catch (err) {
            console.error("[submit] error:", err.message);
            setErrorMsg(err.message || "Something went wrong. Please try again.");
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Complete Your Payment</h2>
                <p className="text-gray-500 text-sm">
                    Pay the $9.99 registration fee, then upload your receipt to submit your application
                </p>
            </div>

            {/* ── Step instructions ──────────────────────────────────────────── */}
            <div className="max-w-md mx-auto flex items-center justify-center gap-0">
                {[
                    { icon: "payments", label: "Pay $9.99" },
                    { icon: "arrow_forward", label: null, arrow: true },
                    { icon: "receipt_long", label: "Upload receipt" },
                    { icon: "arrow_forward", label: null, arrow: true },
                    { icon: "send", label: "Submit" },
                ].map((item, i) =>
                    item.arrow ? (
                        <span key={i} className="material-symbols-outlined text-gray-300 text-[20px] mx-1">
                            arrow_forward
                        </span>
                    ) : (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <div className="w-10 h-10 rounded-full bg-[#195eb3]/10 flex items-center justify-center">
                                <span className="material-symbols-outlined text-[#195eb3] text-[20px]">{item.icon}</span>
                            </div>
                            <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap">{item.label}</span>
                        </div>
                    )
                )}
            </div>

            {/* ── Payment card ──────────────────────────────────────────────── */}
            <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">
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

                <div className="px-6 py-6 space-y-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                        Step 1 — Pay via Revolut
                    </p>

                    <a
                        href={REVOLUT_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 rounded-xl font-bold text-base bg-[#191C1F] hover:bg-[#2c3035] text-white flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                        <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                        Pay Now via Revolut
                    </a>

                    <p className="text-xs text-gray-400 text-center">
                        Opens a secure Revolut payment page — pay $9.99, then come back here
                    </p>
                </div>

                <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 text-center">
                    <p className="text-[11px] text-gray-400">
                        Northampton, United Kingdom &nbsp;·&nbsp; Powered by{" "}
                        <span className="font-bold text-gray-600">Revolut</span> Business
                    </p>
                </div>
            </div>

            {/* ── Receipt upload ────────────────────────────────────────────── */}
            <div className="max-w-md mx-auto space-y-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Step 2 — Upload your payment receipt
                </p>

                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className={`border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-colors text-center
                        ${receipt
                            ? "border-green-400 bg-green-50"
                            : "border-gray-200 bg-gray-50 hover:border-[#195eb3] hover:bg-blue-50"
                        }`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={handleReceiptChange}
                    />

                    {receipt ? (
                        <div className="flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-green-500 text-[36px]">check_circle</span>
                            <p className="text-sm font-semibold text-green-700">{receipt.name}</p>
                            <p className="text-xs text-green-600">
                                {(receipt.size / 1024).toFixed(0)} KB — click to replace
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-gray-400 text-[36px]">upload_file</span>
                            <p className="text-sm font-semibold text-gray-600">
                                Upload payment receipt
                            </p>
                            <p className="text-xs text-gray-400">
                                Screenshot or PDF — drag & drop or click to browse
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Error ────────────────────────────────────────────────────── */}
            {errorMsg && (
                <div className="max-w-md mx-auto flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
                    <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">error</span>
                    <span>{errorMsg}</span>
                </div>
            )}

            {/* ── Nav buttons ───────────────────────────────────────────────── */}
            <div className="max-w-md mx-auto flex justify-between pt-6 border-t border-gray-100">
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
                    onClick={handleSubmit}
                    disabled={submitting || !receipt}
                    className={`px-8 py-3 rounded-full font-bold transition shadow-sm flex items-center gap-2
                        ${submitting || !receipt
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#195eb3] hover:bg-[#1449a0] text-white"
                        }`}
                >
                    {submitting ? (
                        <>
                            <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                            Submitting…
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined text-[18px]">send</span>
                            Submit Application
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
