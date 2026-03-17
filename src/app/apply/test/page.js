import MultiStepForm from "@/components/apply/MultiStepForm";

export default function TestApplyPage() {
    return (
        <section className="py-16 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-amber-50 border-2 border-amber-400 rounded-2xl px-6 py-4 mb-8 max-w-4xl mx-auto flex items-center gap-3">
                    <span className="text-2xl">⚠️</span>
                    <div>
                        <p className="font-black text-amber-800 text-sm">TEST MODE — $0.05 payment</p>
                        <p className="text-amber-700 text-xs mt-0.5">This page is for internal testing only. Do not share publicly.</p>
                    </div>
                </div>
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-12 lg:p-16">
                    <MultiStepForm plan="test" />
                </div>
            </div>
        </section>
    );
}
