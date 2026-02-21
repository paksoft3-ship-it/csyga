import Image from "next/image";
import Link from "next/link";
import partnersData from "@/data/partners.json";

export default function PartnershipOpportunities() {
    const { title, description, items, cta, ctaLink } = partnersData.opportunities;

    return (
        <section className="py-20 bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {items.map((item, idx) => (
                        <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all h-72 tilt-card">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white">{item.icon}</span>
                                    </div>
                                    <span className="text-xs uppercase tracking-wider text-blue-200 font-bold">{item.badge}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-gray-200 text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link href={ctaLink} className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-primary/90 transition">
                        {cta}
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
