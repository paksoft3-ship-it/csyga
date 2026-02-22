"use client";

import { useState } from "react";

export default function PaymentMethods() {
    const [selectedMethod, setSelectedMethod] = useState("stripe");

    const methods = [
        { id: "stripe", name: "Credit / Debit Card", icon: "credit_card" },
        { id: "paypal", name: "PayPal", icon: "payments" },
        { id: "bank", name: "Bank Transfer", icon: "account_balance" }
    ];



    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        alert(`Processing payment via ${selectedMethod}... \n(Mock Submission Successful)`);
    };

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Select Payment Method</h2>
            <p className="text-gray-600 mb-8">Please choose how you would like to pay the application processing fee.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {methods.map((method) => (
                    <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`flex flex-col items-center justify-center p-6 border-2 rounded-2xl transition-all duration-200 ${selectedMethod === method.id
                            ? "border-primary bg-primary/5 text-primary shadow-md"
                            : "border-gray-200 bg-white text-gray-500 hover:border-primary/50 hover:bg-gray-50"
                            }`}
                    >
                        <span className={`material-symbols-outlined text-4xl mb-3 ${selectedMethod === method.id ? "text-primary" : "text-gray-400"}`}>
                            {method.icon}
                        </span>
                        <span className="font-bold">{method.name}</span>
                    </button>
                ))}
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 mb-8 min-h-[300px]">
                {selectedMethod === "stripe" && (
                    <div className="animate-fade-in max-w-md mx-auto">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">lock</span>
                            Secure Card Payment
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Card Number</label>
                                <div className="relative">
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                                    <span className="material-symbols-outlined absolute left-3 top-3.5 text-gray-400 text-[20px]">credit_card</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Expiry Date</label>
                                    <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">CVC</label>
                                    <input type="text" placeholder="123" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Name on Card</label>
                                <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition" />
                            </div>
                        </div>
                    </div>
                )}

                {selectedMethod === "paypal" && (
                    <div className="animate-fade-in flex flex-col items-center justify-center h-[260px] text-center">
                        <span className="material-symbols-outlined text-6xl text-[#00457C] mb-4">payments</span>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Pay with PayPal</h3>
                        <p className="text-gray-600 mb-6 max-w-sm">You will be redirected to PayPal to complete your purchase securely.</p>
                        <p className="text-sm font-semibold text-[#0079C1] bg-[#0079C1]/10 px-4 py-2 rounded-lg">Proceeding will open PayPal in a new window.</p>
                    </div>
                )}

                {selectedMethod === "bank" && (
                    <div className="animate-fade-in">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">account_balance</span>
                            Wire Transfer Instructions
                        </h3>
                        <p className="text-gray-600 mb-6 text-sm">Please transfer the application fee to the following bank account. Registration will be confirmed upon receipt of funds.</p>

                        <div className="bg-white border text-sm border-gray-200 rounded-xl p-6 space-y-3">
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500 font-medium">Bank Name:</span>
                                <span className="font-bold text-gray-900">Global Citizens Bank</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500 font-medium">Account Name:</span>
                                <span className="font-bold text-gray-900">Digital Diplomacy Summit</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500 font-medium">IBAN:</span>
                                <span className="font-bold text-gray-900 font-mono tracking-wider">TR00 0000 0000 0000 0000 0000 00</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-100 pb-2">
                                <span className="text-gray-500 font-medium">SWIFT / BIC:</span>
                                <span className="font-bold text-gray-900 font-mono tracking-wider">GCBTRIS</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 font-medium">Reference:</span>
                                <span className="font-bold text-accent">Use your Registered Phone Number</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                    onClick={handlePaymentSubmit}
                    className="bg-accent text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-accent/90 transition shadow-lg flex items-center gap-2"
                >
                    <span className="material-symbols-outlined">lock</span>
                    {selectedMethod === "bank" ? "Confirm Bank Transfer" : "Complete Payment"}
                </button>
            </div>
        </div>
    );
}
