import Image from "next/image";
import Link from "next/link";
import engagementsData from "@/data/engagements.json";

export default function Workshops() {
    const { title, description, cards, linkText, image, relatedEvents } = engagementsData.workshops;

    return (
        <section className="py-20 bg-background-light" id="workshops">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    <div className="order-2 lg:order-1">
                        <div className="size-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6">
                            <span className="material-symbols-outlined text-3xl">school</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">{title}</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">{description}</p>

                        {/* Workshop Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            {cards.map((card, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className={`size-10 rounded-xl flex items-center justify-center mb-4 ${card.bg} ${card.color}`}>
                                        <span className="material-symbols-outlined">{card.icon}</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                                    <p className="text-gray-600 text-sm">{card.desc}</p>
                                </div>
                            ))}
                        </div>

                        <Link href="/apply" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-4 rounded-full font-bold hover:bg-purple-700 transition-colors">
                            Apply for Workshops
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>

                        {/* Past Events */}
                        {relatedEvents && relatedEvents.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Related Past Events</h4>
                                <div className="flex flex-col gap-2">
                                    {relatedEvents.map((event, idx) => (
                                        <Link key={idx} href={event.link} className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors group/link">
                                            <span className="material-symbols-outlined text-sm text-accent">event</span>
                                            <span className="text-sm group-hover/link:underline">{event.title}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Image */}
                    <div className="order-1 lg:order-2 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl opacity-50 blur-lg group-hover:opacity-70 transition-all"></div>
                        <div className="relative w-full aspect-[4/3] rounded-3xl shadow-xl overflow-hidden cursor-pointer">
                            <Image src={image} alt={title} fill className="object-cover" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
