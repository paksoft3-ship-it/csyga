import aboutData from "@/data/about.json";

export default function GlobalFootprint() {
    const { title, description, metrics } = aboutData.globalFootprint;

    return (
        <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto">{description}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {metrics.map((metric, idx) => (
                        <div key={idx} className="glass-card rounded-2xl p-8 text-center transform hover:scale-105 transition-transform">
                            <div className="text-5xl font-black mb-2">{metric.value}</div>
                            <div className="text-blue-100 font-medium">{metric.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
