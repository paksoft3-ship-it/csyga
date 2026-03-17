"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function loadRevolutSDK() {
    return new Promise((resolve, reject) => {
        if (typeof window !== "undefined" && window.RevolutCheckout) return resolve();
        const script = document.createElement("script");
        script.src = "https://merchant.revolut.com/embed.js";
        script.onload = resolve;
        script.onerror = () => reject(new Error("Failed to load payment SDK."));
        document.head.appendChild(script);
    });
}

export default function Step4Payment({ prevStep, formData, plan }) {
    const router = useRouter();
    const isInstallment = plan === "installment";
    const isAccess = plan === "access";
    const isExperience = plan === "experience";
    const displayAmount = isInstallment ? "$100" : isAccess ? "$400" : isExperience ? "$700" : "$9.99";

    const [status, setStatus] = useState("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handlePay = async () => {
        setStatus("preparing");
        setErrorMsg("");

        try {
            // 1. Upload files + store pending app + create Revolut order
            const payload = new FormData();
            payload.append("name",               formData.name               || "");
            payload.append("email",              formData.email              || "");
            payload.append("phone",              formData.phone              || "");
            payload.append("city",               formData.city               || "");
            payload.append("nationality",        formData.nationality        || "");
            payload.append("passportNumber",     formData.passportNumber     || "");
            payload.append("dob",                formData.dob                || "");
            payload.append("gender",             formData.gender             || "");
            payload.append("isStudent",          formData.isStudent          || "");
            payload.append("hasVolunteerExp",    formData.hasVolunteerExp    || "");
            payload.append("organizations",      formData.organizations      || "");
            payload.append("statementOfPurpose", formData.statementOfPurpose || "");
            payload.append("socialCauses",
                Array.isArray(formData.socialCauses)
                    ? formData.socialCauses.join(", ")
                    : formData.socialCauses || ""
            );
            if (formData.headshot) payload.append("headshot", formData.headshot);
            if (formData.resume)   payload.append("resume",   formData.resume);
            payload.append("plan", plan || "");

            const res = await fetch("/api/create-revolut-order", {
                method: "POST",
                body: payload,
            });
            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || "Could not create payment order.");
            }

            const { token, orderId, pendingId } = data;

            // 2. Load Revolut widget SDK
            await loadRevolutSDK();
            setStatus("paying");

            // 3. Open payment popup
            const mode = process.env.NEXT_PUBLIC_REVOLUT_MODE === "sandbox" ? "sandbox" : "prod";
            const checkout = await window.RevolutCheckout(token, mode);

            checkout.payWithPopup({
                onSuccess: async () => {
                    setStatus("submitting");
                    try {
                        const vRes = await fetch("/api/verify-and-submit", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ orderId, pendingId }),
                        });
                        const vData = await vRes.json();
                        if (!vRes.ok || !vData.success) {
                            throw new Error(vData.error || "Submission failed after payment.");
                        }
                        router.push("/apply/success");
                    } catch (err) {
                        setErrorMsg(
                            "Your payment was received but we had trouble submitting your application. " +
                            "Please contact us at info@csyga.org with your name and email."
                        );
                        setStatus("idle");
                    }
                },
                onError: (err) => {
                    setErrorMsg(err?.message || "Payment failed. Please try again.");
                    setStatus("idle");
                },
                onCancel: () => {
                    setErrorMsg("Payment was cancelled. Click Pay Now to try again.");
                    setStatus("idle");
                },
            });
        } catch (err) {
            setErrorMsg(err.message || "Something went wrong. Please try again.");
            setStatus("idle");
        }
    };

    const isbusy = status !== "idle";

    const statusLabel = {
        preparing:  "Preparing…",
        paying:     "Opening payment…",
        submitting: "Submitting application…",
    }[status];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Complete Your Payment</h2>
                <p className="text-gray-500 text-sm">
                    Pay the {displayAmount} {isInstallment ? "initial enrollment fee" : isAccess ? "summit access fee" : isExperience ? "summit experience fee" : "registration fee"} to finalise your application
                </p>
            </div>

            {/* ── Step indicators ─────────────────────────────────────────────── */}
            <div className="max-w-md mx-auto flex items-center justify-center gap-0">
                {[
                    { icon: "payments", label: `Pay ${displayAmount}` },
                    { icon: "arrow_forward", arrow: true },
                    { icon: "send", label: "Submitted" },
                ].map((item, i) =>
                    item.arrow ? (
                        <span key={i} className="material-symbols-outlined text-gray-300 text-[20px] mx-2">
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

            {/* ── Payment card ─────────────────────────────────────────────────── */}
            <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md">
                <div className="px-6 pt-6 pb-4">
                    <p className="text-2xl font-black text-gray-900">Pay {displayAmount}</p>
                    <p className="text-sm text-gray-500 mt-0.5 font-medium">
                        To CENTER FOR STRATEGIC YOUTH AND GLOBAL AFFAIRS LTD
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-snug">
                        {isInstallment
                            ? "Digital Diplomacy Summit 2026 — Progressive Enrollment Plan (Step 1)"
                            : isAccess
                            ? "Digital Diplomacy Summit 2026 — Summit Access Pass"
                            : isExperience
                            ? "Digital Diplomacy Summit 2026 — Complete Summit Experience"
                            : "Digital Diplomacy Summit 2026 — Istanbul Fully Funded Scholarship (Early Access Registration)"}
                    </p>
                </div>

                <div className="border-t border-gray-100" />

                <div className="px-6 py-6 space-y-4">
                    <p className="text-xs text-gray-400 leading-relaxed">
                        Click <strong>Pay Now</strong> — a secure Revolut payment popup will open.
                        Once payment is complete your application is submitted automatically.
                        No receipt upload needed.
                    </p>

                    <button
                        type="button"
                        onClick={handlePay}
                        disabled={isbusy}
                        className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all
                            ${isbusy
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-[#191C1F] hover:bg-[#2c3035] text-white"
                            }`}
                    >
                        {isbusy ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                                {statusLabel}
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[20px]">payments</span>
                                Pay Now via Revolut
                            </>
                        )}
                    </button>
                </div>

                <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 text-center">
                    <p className="text-[11px] text-gray-400">
                        Northampton, United Kingdom &nbsp;·&nbsp; Istanbul, Turkiye &nbsp;·&nbsp; Powered by{" "}
                        <span className="font-bold text-gray-600">Revolut</span> Business
                    </p>
                </div>
            </div>

            {/* ── Error ──────────────────────────────────────────────────────── */}
            {errorMsg && (
                <div className="max-w-md mx-auto flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
                    <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">error</span>
                    <span>{errorMsg}</span>
                </div>
            )}

            {/* ── Nav ────────────────────────────────────────────────────────── */}
            <div className="max-w-md mx-auto flex justify-between pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={prevStep}
                    disabled={isbusy}
                    className="bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition shadow-sm disabled:opacity-50"
                >
                    Previous
                </button>

                <p className="text-xs text-gray-400 self-center italic">
                    Payment handled by Revolut
                </p>
            </div>
        </div>
    );
}
