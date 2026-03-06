import aboutData from "@/data/about.json";

export default function VisionFocus() {
    const { title, heading, description, items } = aboutData.visionFocus;

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-16 size-72 rounded-full bg-primary/10 blur-3xl"></div>
                <div className="absolute -bottom-24 -right-16 size-72 rounded-full bg-accent/10 blur-3xl"></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{title}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{heading}</h3>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {items.map((item, idx) => (
                        <div key={idx} className="bg-gradient-to-b from-white to-background-light border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
