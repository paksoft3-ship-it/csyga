export default function Step1Personal({ formData, updateFormData, nextStep }) {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information:</h2>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Name <span className="text-red-500 font-normal">(Required)</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. John Doe"
                                value={formData.name}
                                onChange={(e) => updateFormData("name", e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Passport / National ID <span className="text-red-500 font-normal">(Required)</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. AB1234567"
                                value={formData.passportNumber}
                                onChange={(e) => updateFormData("passportNumber", e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Email Address <span className="text-red-500 font-normal">(Required)</span>
                            </label>
                            <input
                                type="email"
                                placeholder="testing@gmail.com"
                                value={formData.email}
                                onChange={(e) => updateFormData("email", e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                            />
                            <p className="text-xs text-gray-500 mt-2">This email will be used for all the confirmations, and communications.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Phone <span className="text-red-500 font-normal">(Required)</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="e.g. +92 300 0000000"
                                value={formData.phone}
                                onChange={(e) => updateFormData("phone", e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                            />
                            <p className="text-xs text-gray-500 mt-2">Please try to add your WhatsApp Number. If not, you can add any contact number of yours.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Current City of Residence <span className="text-red-500 font-normal">(Required)</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Istanbul"
                                value={formData.city}
                                onChange={(e) => updateFormData("city", e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Nationality <span className="text-red-500 font-normal">(Required)</span>
                            </label>
                            <select
                                value={formData.nationality}
                                onChange={(e) => updateFormData("nationality", e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                            >
                                <option value="">Select Nationality</option>
                                {["Afghan", "Albanian", "Algerian", "American", "Argentinean", "Australian", "Austrian", "Bangladeshi", "Belgian", "Brazilian", "British", "Canadian", "Chinese", "Colombian", "Dutch", "Egyptian", "Emirati", "Eritrean", "Ethiopian", "Fijian", "Finnish", "French", "German", "Ghanaian", "Greek", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Japanese", "Jordanian", "Kenyan", "Kuwaiti", "Lebanese", "Malaysian", "Mexican", "Moroccan", "Nepalese", "New Zealander", "Nigerian", "Norwegian", "Omani", "Pakistani", "Palestinian", "Peruvian", "Filipino", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saudi", "Senegalese", "Serbian", "Singaporean", "Somali", "South African", "South Korean", "Spanish", "Sri Lankan", "Sudanese", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tanzanian", "Thai", "Tunisian", "Turkish", "Ugandan", "Ukrainian", "Venezuelan", "Vietnamese", "Yemenite", "Zambian", "Zimbabwean", "Other"].map((nat) => (
                                    <option key={nat} value={nat}>{nat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Date of Birth <span className="text-red-500 font-normal">(Required)</span>
                            </label>
                            <input
                                type="date"
                                value={formData.dob}
                                onChange={(e) => updateFormData("dob", e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Gender <span className="text-red-500 font-normal">(Required)</span>
                            </label>
                            <select
                                value={formData.gender}
                                onChange={(e) => updateFormData("gender", e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-6">
                <button
                    type="button"
                    onClick={() => {
                        // Basic validation check before moving
                        if (formData.name && formData.passportNumber && formData.email && formData.phone && formData.city && formData.nationality && formData.dob && formData.gender) {
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
