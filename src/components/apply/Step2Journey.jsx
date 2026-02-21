export default function Step2Journey({ formData, updateFormData, nextStep, prevStep }) {
    const handleCauseChange = (cause) => {
        const currentCauses = [...formData.socialCauses];
        if (currentCauses.includes(cause)) {
            updateFormData("socialCauses", currentCauses.filter(c => c !== cause));
        } else {
            updateFormData("socialCauses", [...currentCauses, cause]);
        }
    };

    const causes = [
        "Climate Action & Environmental Sustainability",
        "Gender Equality",
        "Youth Empowerment",
        "Education for All",
        "Mental Health & Wellbeing",
        "Poverty Alleviation",
        "Refugees & Migration Issues",
        "Peacebuilding & Conflict Resolution",
        "Innovation & Technology for Good",
        "Human Rights & Social Justice",
        "Other"
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Leadership & Social Impact Journey</h2>

                <div className="space-y-8">

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                            Are you a current student? <span className="text-red-500 font-normal">(Required)</span>
                        </label>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="isStudent" value="Yes" checked={formData.isStudent === "Yes"} onChange={(e) => updateFormData("isStudent", e.target.value)} className="text-primary focus:ring-primary" />
                                <span className="text-sm text-gray-700">Yes</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="isStudent" value="No" checked={formData.isStudent === "No"} onChange={(e) => updateFormData("isStudent", e.target.value)} className="text-primary focus:ring-primary" />
                                <span className="text-sm text-gray-700">No</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">
                            Do you have experience in volunteering? <span className="text-red-500 font-normal">(Required)</span>
                        </label>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="hasVolunteerExp" value="Yes" checked={formData.hasVolunteerExp === "Yes"} onChange={(e) => updateFormData("hasVolunteerExp", e.target.value)} className="text-primary focus:ring-primary" />
                                <span className="text-sm text-gray-700">Yes</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="hasVolunteerExp" value="No" checked={formData.hasVolunteerExp === "No"} onChange={(e) => updateFormData("hasVolunteerExp", e.target.value)} className="text-primary focus:ring-primary" />
                                <span className="text-sm text-gray-700">No</span>
                            </label>
                        </div>
                    </div>

                    {formData.hasVolunteerExp === "Yes" && (
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Name the organizations you've volunteered with:
                            </label>
                            <textarea
                                rows="4"
                                value={formData.organizations}
                                onChange={(e) => updateFormData("organizations", e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                            ></textarea>
                            <p className="text-xs text-gray-500 mt-1">4 of 2500 max characters. You may list up to 4 organizations.</p>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            State your State of Purpose to receive a Fully Funded Scholarship to attend Digital Diplomacy Summit 2026? <span className="text-red-500 font-normal">(Required)</span>
                        </label>
                        <textarea
                            rows="6"
                            value={formData.statementOfPurpose}
                            onChange={(e) => updateFormData("statementOfPurpose", e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                        ></textarea>
                        <p className="text-xs text-gray-500 mt-1">4 of 2000 max characters</p>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Causes That Matter to You</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-4">
                                    Which social causes are you most interested in? <span className="text-red-500 font-normal">(Required)</span>
                                </label>
                                <div className="space-y-3">
                                    {causes.map((cause, idx) => (
                                        <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${formData.socialCauses.includes(cause) ? 'bg-primary border-primary' : 'bg-gray-100 border-gray-300 group-hover:border-primary'}`}>
                                                {formData.socialCauses.includes(cause) && <span className="material-symbols-outlined text-[14px] text-white">check</span>}
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={formData.socialCauses.includes(cause)}
                                                onChange={() => handleCauseChange(cause)}
                                            />
                                            <span className="text-sm text-gray-700">{cause}</span>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-3">Select the social issues you're most passionate about. You may choose more than one.</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Upload your Headshot/DP <span className="text-red-500 font-normal">(Required)</span>
                                    </label>
                                    <div className="flex items-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                            <div className="flex flex-col items-center justify-center pt-2 pb-2">
                                                <p className="text-sm font-bold text-gray-500"><span className="text-gray-800">Choose File</span> No file chosen</p>
                                            </div>
                                            <input type="file" className="hidden" onChange={(e) => updateFormData("headshot", e.target.files[0])} accept="image/*" />
                                        </label>
                                    </div>
                                    {formData.headshot && <p className="text-sm text-accent font-bold mt-2">{formData.headshot.name} uploaded.</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Upload your CV / Resume / Portfolio <span className="text-red-500 font-normal">(Required)</span>
                                    </label>
                                    <div className="flex items-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                                            <div className="flex flex-col items-center justify-center pt-2 pb-2">
                                                <p className="text-sm font-bold text-gray-500"><span className="text-gray-800">Choose File</span> No file chosen</p>
                                            </div>
                                            <input type="file" className="hidden" onChange={(e) => updateFormData("resume", e.target.files[0])} accept=".pdf,.doc,.docx,.rtf,.txt,.jpg,.jpeg,.png" />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">PDF, DOCX, TXT, or Image format – Max file size: 5MB</p>
                                    {formData.resume && <p className="text-sm text-accent font-bold mt-2">{formData.resume.name} uploaded.</p>}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-100 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition shadow-sm"
                >
                    Previous
                </button>
                <button
                    type="button"
                    onClick={() => {
                        if (formData.isStudent && formData.hasVolunteerExp && formData.statementOfPurpose && formData.socialCauses.length > 0) {
                            nextStep();
                        } else {
                            alert("Please fill out all required fields.");
                        }
                    }}
                    className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition shadow-md"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
