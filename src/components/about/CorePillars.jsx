import aboutData from "@/data/about.json";

export default function CorePillars() {
    const { title, heading, description, items } = aboutData.corePillars;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{title}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{heading}</h3>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((pillar, idx) => (
                        <div key={idx} className="relative bg-background-light p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
                            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${pillar.gradient}`}></div>
                            <div className={`mb-5 ${pillar.textColor}`}>
                                <span className="material-symbols-outlined text-4xl">{pillar.icon}</span>
                            </div>
                            <h4 className="text-xl font-bold mb-3 text-gray-900">{pillar.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{pillar.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
