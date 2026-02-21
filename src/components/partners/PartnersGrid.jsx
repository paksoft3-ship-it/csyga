import Image from "next/image";
import partnersData from "@/data/partners.json";

export default function PartnersGrid() {
    const { title, description, logos } = partnersData.network;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
                    {logos.map((logo, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition border border-gray-100 w-full flex items-center justify-center h-32 tilt-card relative">
                            <Image
                                src={logo.src}
                                alt={logo.name}
                                fill
                                className="object-contain p-4"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
