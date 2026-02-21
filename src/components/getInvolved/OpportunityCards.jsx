import Image from "next/image";
import Link from "next/link";
import data from "@/data/getInvolved.json";

export default function OpportunityCards() {
    const { title, subtitle, items } = data.getInvolved.opportunities;

    const [featured, card, wideCard] = items;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Featured */}
                    <div className="lg:col-span-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl overflow-hidden border border-primary/10 shadow-lg p-0">
                        <div className="flex flex-col lg:flex-row">
                            <div className="lg:w-1/2 relative">
                                <Image src={featured.image} alt={featured.title} fill className="object-cover h-64 lg:h-full" />
                                <div className="absolute top-4 left-4 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-sm">star</span>
                                    Featured Program
                                </div>
                            </div>
                            <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary">{featured.icon}</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{featured.title}</h3>
                                <p className="text-gray-600 mb-6">{featured.description}</p>
                                <ul className="space-y-3 mb-6">
                                    {featured.bullets.map((b, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-700">
                                            <span className="material-symbols-outlined text-accent text-xl">check_circle</span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={featured.ctaLink} className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-primary/90 transition w-fit">
                                    {featured.cta}
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Standard Card */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition border border-gray-100 tilt-card">
                        <div className="relative h-56">
                            <Image src={card.image} alt={card.title} fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <div className="p-6">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="material-symbols-outlined text-primary">{card.icon}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{card.description}</p>
                            <ul className="space-y-2 mb-6">
                                {card.bullets.map((b, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                        <span className="material-symbols-outlined text-accent text-base">check</span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                            <a href={card.ctaLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-primary text-primary px-5 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition">
                                {card.cta}
                            </a>
                        </div>
                    </div>

                    {/* Wide Card */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition border border-gray-100 tilt-card lg:col-span-2">
                        <div className="flex flex-col md:flex-row h-full">
                            <div className="md:w-1/2 relative h-56 md:h-full">
                                <Image src={wideCard.image} alt={wideCard.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r"></div>
                            </div>
                            <div className="md:w-1/2 p-6 flex flex-col justify-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <span className="material-symbols-outlined text-primary">{wideCard.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{wideCard.title}</h3>
                                <p className="text-gray-600 text-sm mb-4">{wideCard.description}</p>
                                <ul className="space-y-2 mb-6">
                                    {wideCard.bullets.map((b, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="material-symbols-outlined text-accent text-base">check</span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                                <a href={wideCard.ctaLink} className="inline-flex items-center gap-2 border-2 border-primary text-primary px-5 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition w-fit">
                                    {wideCard.cta}
                                    <span className="material-symbols-outlined text-sm">arrow_downward</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
