export default function Step3Terms({ formData, updateFormData, prevStep, handleSubmit, submitting, submitError }) {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms and Conditions</h2>
                <p className="text-gray-600 mb-6 text-sm">
                    <strong>Terms and Conditions for Fully Funded Applicants of Digital Diplomacy Summit 2026</strong><br />
                    By applying for the <strong>Digital Diplomacy Summit 2026</strong>, you agree to abide by the following Terms and Conditions. These terms are binding upon submission of your application, and acceptance of these conditions is mandatory to complete the application process.
                </p>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 h-80 overflow-y-auto text-sm text-gray-700 space-y-4 shadow-inner">
                    <h4 className="font-bold text-gray-900">1. Eligibility and Application Submission</h4>
                    <p>1.1. Applicants must meet all eligibility requirements outlined on the official event website at the time of submission.</p>
                    <p>1.2. All information provided must be accurate, complete, and verifiable. Providing false, incomplete, or misleading information may result in disqualification without notice.</p>
                    <p>1.3. Submission of an application does not guarantee selection for the Fully Funded Category. The organizing committee reserves the right to select participants at its sole discretion, and all decisions are final and not subject to appeal.</p>
                    <p>1.4. Selected participants are required to confirm their attendance within the given timeframe. Failure to confirm may result in forfeiture of the Fully Funded benefit.</p>

                    <h4 className="font-bold text-gray-900">2. Non-Refundable Application Fee</h4>
                    <p>2.1. Applicants under the Fully Funded Category are required to pay an application processing fee as part of the submission process.</p>
                    <p>2.2. The application fee is <strong>non-refundable under any circumstances</strong>, including but not limited to:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Failure to be selected for the Fully Funded Category</li>
                        <li>Withdrawal of the application by the applicant</li>
                        <li>Postponement, cancellation, or change in the event date, venue, or format</li>
                    </ul>
                    <p>2.3. By submitting your application and paying the fee, you acknowledge that no refunds will be provided for any reason.</p>

                    <h4 className="font-bold text-gray-900">3. Event Changes, Amendments, and Postponement</h4>
                    <p>3.1. The organizing committee reserves the right to amend, modify, reschedule, or cancel the Digital Diplomacy Summit 2026 for any reason, including but not limited to unforeseen circumstances such as natural disasters, pandemics, travel restrictions, or political events.</p>
                    <p>3.2. In the event of changes, participants will be notified through the contact details provided in their application.</p>
                    <p>3.3. The organizing committee is not responsible for any costs, expenses, or damages incurred by applicants due to such changes, postponements, or cancellations.</p>

                    <h4 className="font-bold text-gray-900">4. Travel and Attendance Requirements</h4>
                    <p>4.1. Fully Funded participants will receive round-trip airfare support and accommodations as outlined by the organizers.</p>
                    <p>4.2. Participants are responsible for obtaining any required visas or travel permits. The organizers will provide necessary supporting documentation but are not liable for visa rejections or travel delays.</p>

                    <h4 className="font-bold text-gray-900">5. Media Release and Consent</h4>
                    <p>5.1. By participating, you grant the organizers, partners, and affiliates the irrevovable right to take photographs and video recordings of you during the event.</p>
                </div>

                <div className="mt-8">
                    <label className="flex items-start gap-4 cursor-pointer group p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-primary transition-colors">
                        <div className={`mt-0.5 w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${formData.agreeTerms ? 'bg-primary border-primary' : 'bg-white border-gray-300 group-hover:border-primary'}`}>
                            {formData.agreeTerms && <span className="material-symbols-outlined text-[16px] text-white">check</span>}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={formData.agreeTerms}
                            onChange={(e) => updateFormData("agreeTerms", e.target.checked)}
                        />
                        <span className="text-sm text-gray-700 leading-relaxed font-bold">
                            By clicking the 'I Agree' button below, you acknowledge that you have read, understood, and agree to abide by the above Terms and Conditions.
                        </span>
                    </label>
                </div>
            </div>

            {submitError && (
                <div className="mt-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
                    <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">error</span>
                    <span>{submitError}</span>
                </div>
            )}

            <div className="flex justify-between pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition shadow-sm"
                >
                    Previous
                </button>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className={`px-8 py-3 rounded-full font-bold transition shadow-md flex items-center gap-2 ${formData.agreeTerms && !submitting ? 'bg-accent hover:bg-accent/90 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    disabled={!formData.agreeTerms || submitting}
                >
                    {submitting ? "Submitting..." : "Submit Application"}
                    <span className="material-symbols-outlined">{submitting ? "hourglass_empty" : "send"}</span>
                </button>
            </div>
        </div>
    );
}
