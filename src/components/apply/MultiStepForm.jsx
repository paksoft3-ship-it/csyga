"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Step1Personal from "./Step1Personal";
import Step2Journey from "./Step2Journey";
import Step3Terms from "./Step3Terms";
import Stepper from "./Stepper";
import CheckoutModal from "./CheckoutModal";

export default function MultiStepForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

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

    const [showCheckout, setShowCheckout] = useState(false);
    const [submitting, setSubmitting]     = useState(false);
    const [submitError, setSubmitError]   = useState("");

    const nextStep = () => { if (currentStep < totalSteps) setCurrentStep(currentStep + 1); };
    const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
    const updateFormData = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

    const handlePay = async () => {
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

            const res  = await fetch("/api/send-application", { method: "POST", body: payload });
            const data = await res.json();

            if (!res.ok || data.success === false) {
                setSubmitError(data.error || "Submission failed. Please try again.");
                return;
            }

            // Email sent — now redirect to Revolut payment
            window.location.href = "https://checkout.revolut.com/payment-link/39be6362-9836-4069-b627-3c8c3af46832";

        } catch (err) {
            console.error("Submission error:", err);
            setSubmitError("Network error. Please check your connection and try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
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
                            onOpenCheckout={() => setShowCheckout(true)}
                        />
                    )}
                </form>
            </div>

            {showCheckout && (
                <CheckoutModal
                    formData={formData}
                    onPay={handlePay}
                    submitting={submitting}
                    submitError={submitError}
                    onClose={() => { setShowCheckout(false); setSubmitError(""); }}
                />
            )}
        </>
    );
}
