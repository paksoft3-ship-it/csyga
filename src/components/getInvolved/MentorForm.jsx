"use client";
import data from "@/data/getInvolved.json";

export default function MentorForm() {
    const { title, subtitle } = data.getInvolved.mentorForm;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Mentor application logic would be processed here.");
    };

    return (
        <section className="py-20 bg-white" id="mentor-form">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                        <span className="material-symbols-outlined text-4xl">supervised_user_circle</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="bg-background-light rounded-2xl p-8 md:p-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Area of Expertise *</label>
                                <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white">
                                    <option value="">Select your field</option>
                                    <option value="diplomacy">Diplomacy & International Relations</option>
                                    <option value="policy">Policy Analysis & Development</option>
                                    <option value="conflict">Conflict Resolution & Mediation</option>
                                    <option value="technology">Digital Governance & Technology</option>
                                    <option value="humanitarian">Humanitarian Affairs</option>
                                    <option value="leadership">Leadership & Strategic Communication</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Current Organization / Affiliation</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile URL</label>
                            <input type="url" placeholder="https://linkedin.com/in/..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to become a mentor? *</label>
                            <textarea required rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none bg-white" placeholder="Tell us about your experience and what you hope to contribute..."></textarea>
                        </div>

                        <button type="submit" className="w-full bg-primary text-white px-6 py-4 rounded-full font-bold shadow hover:bg-primary/90 transition flex items-center justify-center gap-2">
                            Submit Mentor Application
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
