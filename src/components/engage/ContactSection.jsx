"use client";
import data from "@/data/getInvolved.json";

export default function ContactSection() {
    const { title, subtitle, email, phone, address } = data.engage.contact;

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message sending functionality will be integrated with chosen backend.");
    };

    return (
        <section className="py-20 bg-white" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{title}</h2>
                        <p className="text-lg text-gray-600 mb-8">{subtitle}</p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-5 bg-background-light rounded-xl tilt-card">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-primary">mail</span>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                                    <p className="text-gray-600 break-all">{email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-5 bg-background-light rounded-xl tilt-card">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                                    <span className="material-symbols-outlined text-accent">phone</span>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                                    <p className="text-gray-600">{phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-5 bg-background-light rounded-xl tilt-card">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="material-symbols-outlined text-primary">location_on</span>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-gray-900 mb-1">Visit Us</h3>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                        {address}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-background-light rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                <input type="text" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <select required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white">
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="partnership">Partnership Opportunity</option>
                                    <option value="program">Program Information</option>
                                    <option value="media">Media Inquiry</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea required rows="5" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none bg-white"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-primary text-white px-6 py-4 rounded-full font-bold shadow hover:bg-primary/90 transition flex items-center justify-center gap-2">
                                Send Message
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
