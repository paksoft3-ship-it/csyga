"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Step1Personal from "./Step1Personal";
import Step2Journey from "./Step2Journey";
import Step3Terms from "./Step3Terms";
import Stepper from "./Stepper";

export default function MultiStepForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    // Form State
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
        agreeTerms: false
    });

    const nextStep = () => {
        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.agreeTerms) {
            alert("You must agree to the Terms and Conditions to submit.");
            return;
        }
        // Route to the new checkout page, passing ID or state later if needed
        router.push('/checkout');
    };

    return (
        <div className="max-w-4xl mx-auto w-full">
            <Stepper currentStep={currentStep} totalSteps={totalSteps} />

            <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
                {currentStep === 1 && (
                    <Step1Personal formData={formData} updateFormData={updateFormData} nextStep={nextStep} />
                )}
                {currentStep === 2 && (
                    <Step2Journey formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />
                )}
                {currentStep === 3 && (
                    <Step3Terms formData={formData} updateFormData={updateFormData} prevStep={prevStep} handleSubmit={handleSubmit} />
                )}
            </form>
        </div>
    );
}
