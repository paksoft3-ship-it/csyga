const COUNTRY_OPTIONS = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
    "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin",
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
    "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
    "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia",
    "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
    "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
    "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
    "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
    "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
    "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea",
    "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
    "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
    "Yemen", "Zambia", "Zimbabwe", "Other"
];

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
                                placeholder="e.g. +44 7459 505747"
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
                                {COUNTRY_OPTIONS.map((nat) => (
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
