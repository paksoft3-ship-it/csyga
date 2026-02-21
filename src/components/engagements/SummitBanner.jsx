import Image from "next/image";
import Link from "next/link";
import engagementsData from "@/data/engagements.json";

export default function SummitBanner() {
    const { badge, title, dateLocation, description, deadline, link, image } = engagementsData.summitBanner;

    return (
        <section className="py-12 bg-gradient-to-r from-primary to-accent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="glass-card rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent text-white text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            {badge}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{title}</h2>
                        <p className="text-blue-100 flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined">calendar_month</span>
                            {dateLocation}
                        </p>
                        <p className="text-blue-100 mb-4">{description}</p>
                        <p className="text-white font-bold mb-6">{deadline}</p>
                        <Link href={link} className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg">
                            Apply Now
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <div className="relative w-full h-64 rounded-2xl shadow-xl overflow-hidden cursor-pointer">
                            <Image src={image} alt={title} fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
