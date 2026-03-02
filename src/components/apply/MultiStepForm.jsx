"use client";
import { useState } from "react";
import Step1Personal from "./Step1Personal";
import Step2Journey from "./Step2Journey";
import Step3Terms from "./Step3Terms";
import Step4Payment from "./Step4Payment";
import Stepper from "./Stepper";

export default function MultiStepForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        nationality: "",
        passportNumber: "",
        dob: "",
        gender: "",
        isStudent: "",
        hasVolunteerExp: "",
        organizations: "",
        statementOfPurpose: "",
        socialCauses: [],
        headshot: null,
        resume: null,
        agreeTerms: false,
    });

    const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1); };
    const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
    const updateFormData = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

    return (
        <div className="max-w-4xl mx-auto w-full">
            <Stepper currentStep={currentStep} totalSteps={totalSteps} />

            <form onSubmit={(e) => e.preventDefault()}>
                {currentStep === 1 && (
                    <Step1Personal formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
                )}
                {currentStep === 2 && (
                    <Step2Journey formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
                )}
                {currentStep === 3 && (
                    <Step3Terms
                        formData={formData}
                        updateFormData={updateFormData}
                        prevStep={prevStep}
                        onProceed={nextStep}
                        submitting={false}
                        submitError=""
                    />
                )}
                {currentStep === 4 && (
                    <Step4Payment
                        prevStep={prevStep}
                        formData={formData}
                    />
                )}
            </form>
        </div>
    );
}
