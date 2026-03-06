import Image from "next/image";
import aboutData from "@/data/about.json";
import partnersData from "@/data/partners.json";

export default function AboutPartnersSlider() {
    const { title, caption } = aboutData.aboutPartners;
    const logos = [...partnersData.network.logos, ...partnersData.network.logos];

    return (
        <section className="py-20 bg-background-light overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">{caption}</p>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background-light to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background-light to-transparent z-10" />
                <div className="flex w-max animate-logo-scroll gap-6 px-6">
                    {logos.map((logo, idx) => (
                        <div key={`${logo.name}-${idx}`} className="relative h-24 w-44 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center px-4 py-3">
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                fill
                                className="object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition p-4"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
