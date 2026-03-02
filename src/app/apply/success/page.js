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
                            Application Submitted!
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
                            application and payment have been received and are now
                            under review by our team.
                        </p>

                        {/* Confirmation box */}
                        <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-5 text-left space-y-2">
                            <div className="flex items-center gap-2 text-green-700 font-bold text-sm uppercase tracking-wide">
                                <span className="material-symbols-outlined text-[18px]">verified</span>
                                Payment & Application Confirmed
                            </div>
                            <p className="text-green-800 text-sm leading-relaxed">
                                Your <strong>$9.99 USD</strong> registration fee and application
                                details have been successfully received. We will be in touch
                                with the next steps shortly.
                            </p>
                        </div>

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
