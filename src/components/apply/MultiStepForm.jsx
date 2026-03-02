"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Step1Personal from "./Step1Personal";
import Step2Journey from "./Step2Journey";
import Step3Terms from "./Step3Terms";
import Step4Payment from "./Step4Payment";
import Stepper from "./Stepper";

export default function MultiStepForm() {
    const router = useRouter();
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

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1); };
    const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
    const updateFormData = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

    // Step 3 → Step 4: advance without any API call
    const handleProceedToPayment = () => {
        setSubmitError("");
        nextStep();
    };

    // Step 4: called only after user uploads their payment receipt
    const handleFinalSubmit = async (receiptFile) => {
        setSubmitting(true);
        setSubmitError("");

        try {
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
            payload.append("socialCauses",       formData.socialCauses.join(", "));
            if (formData.headshot) payload.append("headshot", formData.headshot);
            if (formData.resume)   payload.append("resume",   formData.resume);
            if (receiptFile)       payload.append("paymentReceipt", receiptFile);

            const res  = await fetch("/api/send-application", { method: "POST", body: payload });
            const data = await res.json();

            if (!res.ok || data.success === false) {
                setSubmitError(data.error || "Submission failed. Please try again.");
                return;
            }

            router.push("/apply/success");

        } catch (err) {
            console.error("Submission error:", err);
            setSubmitError("Network error. Please check your connection and try again.");
        } finally {
            setSubmitting(false);
        }
    };

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
                        onProceed={handleProceedToPayment}
                        submitting={false}
                        submitError=""
                    />
                )}
                {currentStep === 4 && (
                    <Step4Payment
                        prevStep={prevStep}
                        onSubmit={handleFinalSubmit}
                        submitting={submitting}
                        submitError={submitError}
                    />
                )}
            </form>
        </div>
    );
}
