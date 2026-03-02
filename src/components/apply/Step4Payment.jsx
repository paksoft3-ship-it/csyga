"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// State machine: idle → creating → paying → verifying → done | error
const STATES = {
    IDLE: "idle",
    CREATING: "creating",
    PAYING: "paying",
    VERIFYING: "verifying",
    DONE: "done",
    ERROR: "error",
};

export default function Step4Payment({ prevStep, formData }) {
    const router = useRouter();
    const [stage, setStage] = useState(STATES.IDLE);
    const [errorMsg, setErrorMsg] = useState("");
    const revolutLoaded = useRef(false);

    // Load RevolutCheckout.js embed script once
    useEffect(() => {
        if (revolutLoaded.current || document.getElementById("revolut-embed")) return;
        const script = document.createElement("script");
        script.id = "revolut-embed";
        const mode = process.env.NEXT_PUBLIC_REVOLUT_MODE === "sandbox" ? "sandbox" : "prod";
        script.src = mode === "sandbox"
            ? "https://sandbox-merchant.revolut.com/embed.js"
            : "https://merchant.revolut.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
        revolutLoaded.current = true;
    }, []);

    const handlePayNow = async () => {
        setStage(STATES.CREATING);
        setErrorMsg("");

        try {
            // ── Step 1: Upload files + create Revolut order ────────────────────
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

            const createRes = await fetch("/api/create-revolut-order", {
                method: "POST",
                body: payload,
            });
            const createData = await createRes.json();

            if (!createRes.ok || !createData.success) {
                throw new Error(createData.error || "Failed to initialise payment.");
            }

            const { token, orderId, pendingId } = createData;

            // ── Step 2: Open RevolutCheckout popup ────────────────────────────
            if (typeof window.RevolutCheckout === "undefined") {
                throw new Error("Payment widget failed to load. Please refresh and try again.");
            }

            setStage(STATES.PAYING);

            const instance = await window.RevolutCheckout(token, {
                mode: process.env.NEXT_PUBLIC_REVOLUT_MODE === "sandbox" ? "sandbox" : "prod",
            });

            instance.payWithPopup({
                onSuccess: async () => {
                    // ── Step 3: Verify payment server-side ─────────────────────
                    setStage(STATES.VERIFYING);

                    try {
                        const verifyRes = await fetch("/api/verify-and-submit", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ orderId, pendingId }),
                        });
                        const verifyData = await verifyRes.json();

                        if (!verifyRes.ok || !verifyData.success) {
                            throw new Error(verifyData.error || "Payment verification failed.");
                        }

                        setStage(STATES.DONE);
                        router.push("/apply/success");
                    } catch (err) {
                        // Even if verify-and-submit fails, webhook may still fire.
                        // Show a soft warning rather than a hard error.
                        console.error("[verify] error:", err.message);
                        setErrorMsg(
                            "Payment received — your application is being processed. " +
                            "If you don't receive a confirmation email within 10 minutes, " +
                            "please contact us."
                        );
                        setStage(STATES.ERROR);
                    }
                },
                onError: (message) => {
                    console.error("[revolut] payment error:", message);
                    setErrorMsg(message || "Payment failed. Please try again.");
                    setStage(STATES.ERROR);
                },
                onCancel: () => {
                    console.log("[revolut] payment cancelled");
                    setStage(STATES.IDLE);
                },
            });

        } catch (err) {
            console.error("[pay-now] error:", err.message);
            setErrorMsg(err.message || "Something went wrong. Please try again.");
            setStage(STATES.ERROR);
        }
    };

    const isWorking = stage === STATES.CREATING || stage === STATES.PAYING || stage === STATES.VERIFYING;

    const statusLabel = {
        [STATES.CREATING]:  "Setting up payment…",
        [STATES.PAYING]:    "Waiting for payment…",
        [STATES.VERIFYING]: "Verifying payment…",
    }[stage] || "";

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Complete Your Payment</h2>
                <p className="text-gray-500 text-sm">
                    Pay the $9.99 registration fee to submit your application automatically
                </p>
            </div>

            {/* ── Payment card ──────────────────────────────────────────────── */}
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

                {/* Pay Now button */}
                <div className="px-6 py-6">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                        Secure payment via Revolut
                    </p>

                    <button
                        type="button"
                        onClick={handlePayNow}
                        disabled={isWorking}
                        className={`w-full py-4 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-sm
                            ${isWorking
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-[#191C1F] hover:bg-[#2c3035] text-white"
                            }`}
                    >
                        {isWorking ? (
                            <>
                                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                                {statusLabel}
                            </>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[20px]">payments</span>
                                Pay Now with Revolut
                            </>
                        )}
                    </button>

                    {/* Payment method icons */}
                    <div className="flex items-center justify-center gap-3 mt-4 opacity-60">
                        {/* Visa */}
                        <svg width="36" height="22" viewBox="0 0 780 500" fill="none">
                            <rect width="780" height="500" rx="40" fill="#1A1F71"/>
                            <text x="120" y="320" fill="white" fontSize="230" fontWeight="bold" fontFamily="Arial">VISA</text>
                        </svg>
                        {/* Mastercard */}
                        <svg width="32" height="22" viewBox="0 0 131.39 86.9" fill="none">
                            <rect x="0" y="0" width="131.39" height="86.9" rx="6" fill="#252525"/>
                            <circle cx="48.37" cy="43.45" r="27.23" fill="#eb001b"/>
                            <circle cx="83.02" cy="43.45" r="27.23" fill="#f79e1b"/>
                            <path d="M65.7 19.73a27.23 27.23 0 0 1 0 47.44A27.23 27.23 0 0 1 65.7 19.73z" fill="#ff5f00"/>
                        </svg>
                        {/* Apple Pay text */}
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Apple Pay</span>
                        {/* Google Pay text */}
                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">G Pay</span>
                    </div>
                </div>

                <div className="border-t border-gray-100 px-6 py-3 bg-gray-50 text-center">
                    <p className="text-[11px] text-gray-400">
                        Northampton, United Kingdom &nbsp;·&nbsp; Powered by{" "}
                        <span className="font-bold text-gray-600">Revolut</span> Business
                    </p>
                </div>
            </div>

            {/* ── Info box ─────────────────────────────────────────────────── */}
            <div className="max-w-md mx-auto bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-500 text-[22px] shrink-0 mt-0.5">info</span>
                    <div>
                        <p className="text-sm font-bold text-blue-800">How it works</p>
                        <p className="text-xs text-blue-700 mt-0.5 leading-relaxed">
                            Click <strong>Pay Now</strong> — a secure Revolut popup will open.
                            Once payment is confirmed, your application is submitted automatically.
                            No receipt upload needed.
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Error ────────────────────────────────────────────────────── */}
            {stage === STATES.ERROR && errorMsg && (
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
                    disabled={isWorking}
                    className="bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition shadow-sm disabled:opacity-50"
                >
                    Previous
                </button>
            </div>
        </div>
    );
}
