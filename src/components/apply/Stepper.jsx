export default function Stepper({ currentStep, totalSteps }) {
    const steps = [
        { num: 1, label: "PERSONAL" },
        { num: 2, label: "JOURNEY" },
        { num: 3, label: "TERMS" },
        { num: 4, label: "PAYMENT" },
    ];

    return (
        <div className="flex items-center gap-2 mb-8 flex-wrap">
            {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${currentStep >= step.num
                                ? "bg-primary text-white"
                                : "bg-gray-100 text-gray-400 border border-gray-200"
                            }`}
                    >
                        {currentStep > step.num ? <span className="material-symbols-outlined text-sm">check</span> : step.num}
                    </div>
                    <span
                        className={`text-xs font-bold ${currentStep >= step.num ? "text-gray-900" : "text-gray-400"
                            }`}
                    >
                        {step.label}
                    </span>
                    {idx < steps.length - 1 && (
                        <div className="w-8 border-t border-gray-200 mx-1"></div>
                    )}
                </div>
            ))}
        </div>
    );
}
