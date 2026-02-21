export default function NewsletterSection() {
    return (
        <section className="py-20 bg-gradient-to-r from-primary to-accent">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Subscribe to our Newsletter</h2>
                <p className="text-blue-100 text-lg mb-8">
                    Stay updated with our latest programs, events, and opportunities for youth engagement in global affairs.
                </p>
                <form className="subscribe-form flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" id="newsletterForm">
                    <input type="text" name="website" className="hidden" tabIndex="-1" autoComplete="off" />
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        required
                        className="flex-grow px-6 py-4 rounded-full bg-white/10 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button
                        type="submit"
                        className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
}
