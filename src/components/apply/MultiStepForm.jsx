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

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agreeTerms) {
            alert("You must agree to the Terms and Conditions to submit.");
            return;
        }

        setSubmitting(true);

        try {
            // Build FormData so files are included as attachments
            const payload = new FormData();
            payload.append("name", formData.name);
            payload.append("email", formData.email);
            payload.append("phone", formData.phone);
            payload.append("city", formData.city);
            payload.append("nationality", formData.nationality);
            payload.append("passportNumber", formData.passportNumber);
            payload.append("dob", formData.dob);
            payload.append("gender", formData.gender);
            payload.append("isStudent", formData.isStudent);
            payload.append("hasVolunteerExp", formData.hasVolunteerExp);
            payload.append("organizations", formData.organizations);
            payload.append("statementOfPurpose", formData.statementOfPurpose);
            payload.append("socialCauses", formData.socialCauses.join(", "));
            if (formData.headshot) payload.append("headshot", formData.headshot);
            if (formData.resume) payload.append("resume", formData.resume);

            await fetch("/api/send-application", {
                method: "POST",
                body: payload,
            });
        } catch (err) {
            console.error("Failed to send application email:", err);
        } finally {
            setSubmitting(false);
            // Redirect to Revolut checkout regardless
            window.location.href = "https://checkout.revolut.com/payment-link/39be6362-9836-4069-b627-3c8c3af46832";
        }
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
                    <Step3Terms formData={formData} updateFormData={updateFormData} prevStep={prevStep} handleSubmit={handleSubmit} submitting={submitting} />
                )}
            </form>
        </div>
    );
}
