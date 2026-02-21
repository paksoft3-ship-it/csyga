import aboutData from "@/data/about.json";

export default function WhyCsyga() {
    const { title, heading, description, items } = aboutData.whyCsyga;

    return (
        <section className="py-20 bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{title}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{heading}</h3>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, idx) => (
                        <div key={idx} className={`bg-white p-8 rounded-2xl border border-gray-100 ${item.hoverBorder} hover:shadow-lg transition-all`}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`size-12 rounded-xl flex items-center justify-center ${item.bgColor} ${item.textColor}`}>
                                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                            </div>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
