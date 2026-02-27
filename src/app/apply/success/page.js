export const metadata = {
    title: "Application Received – CSYGA",
};

export default function ApplicationSuccessPage() {
    return (
        <section className="min-h-screen bg-[#f6f7f8] flex items-center justify-center px-4 py-24">
            <div className="max-w-2xl w-full">

                {/* Success card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* Top banner */}
                    <div className="bg-[#195eb3] px-8 py-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-white text-5xl">check_circle</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                            Application Received!
                        </h1>
                        <p className="text-blue-100 text-base">
                            Digital Diplomacy Summit 2026
                        </p>
                    </div>

                    {/* Body */}
                    <div className="px-8 py-10 text-center space-y-6">
                        <p className="text-gray-700 text-lg leading-relaxed">
                            Thank you for applying to the{" "}
                            <strong>Digital Diplomacy Summit 2026</strong>. Your
                            application has been successfully submitted and is now
                            under review by our team.
                        </p>

                        {/* Payment notice box */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-5 text-left space-y-2">
                            <div className="flex items-center gap-2 text-amber-700 font-bold text-sm uppercase tracking-wide">
                                <span className="material-symbols-outlined text-[18px]">info</span>
                                Payment Required for Approval
                            </div>
                            <p className="text-amber-800 text-sm leading-relaxed">
                                To complete your application and secure your spot,
                                please proceed to make the <strong>non-refundable application
                                fee payment</strong>. Your application will only be considered
                                for approval once the payment has been received.
                            </p>
                        </div>

                        {/* Payment CTA */}
                        <a
                            href="https://checkout.revolut.com/payment-link/39be6362-9836-4069-b627-3c8c3af46832"
                            className="inline-flex items-center gap-3 bg-[#2ec27e] hover:bg-[#28ae6e] text-white font-bold text-lg px-10 py-4 rounded-full shadow-md transition-colors"
                        >
                            <span className="material-symbols-outlined">payment</span>
                            Proceed to Payment
                        </a>

                        <p className="text-gray-400 text-xs">
                            You will be redirected to our secure payment partner, Revolut.
                        </p>

                        {/* Divider */}
                        <div className="border-t border-gray-100 pt-6">
                            <p className="text-gray-500 text-sm">
                                Have questions? Reach us at{" "}
                                <a
                                    href="mailto:Thecsyga@gmail.com"
                                    className="text-[#195eb3] font-semibold hover:underline"
                                >
                                    Thecsyga@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
