import Image from "next/image";
import Link from "next/link";

export default function GenericEngagement({
    id,
    data,
    iconName,
    iconBgColor,
    iconTextColor,
    imageGradient,
    bulletIconColor,
    ctaBg,
    ctaHoverBg,
    reverseLayout = false
}) {
    const { title, p1, p2, bullets, linkText, image, relatedEvents } = data;

    return (
        <section className="py-20 bg-white" id={id}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className={`order-2 ${reverseLayout ? 'lg:order-2' : 'lg:order-1'}`}>
                        <div className={`size-14 rounded-2xl ${iconBgColor} flex items-center justify-center ${iconTextColor} mb-6`}>
                            <span className="material-symbols-outlined text-3xl">{iconName}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">{title}</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-4">{p1}</p>
                        <p className="text-gray-600 mb-6">{p2}</p>

                        <ul className="space-y-3 mb-8">
                            {bullets.map((bullet, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <span className={`material-symbols-outlined mt-0.5 ${bulletIconColor}`}>check_circle</span>
                                    <span className="text-gray-700">{bullet}</span>
                                </li>
                            ))}
                        </ul>

                        <Link href="/apply" className={`inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-bold transition-colors ${ctaBg} ${ctaHoverBg}`}>
                            {linkText}
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
                    <div className={`relative group order-1 ${reverseLayout ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className={`absolute -inset-4 bg-gradient-to-r ${imageGradient} rounded-3xl opacity-50 blur-lg group-hover:opacity-70 transition-all`}></div>
                        <div className="relative w-full aspect-[4/3] rounded-3xl shadow-xl overflow-hidden cursor-pointer">
                            <Image src={image} alt={title} fill className="object-cover" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
