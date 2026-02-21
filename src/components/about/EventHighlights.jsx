import Image from "next/image";
import aboutData from "@/data/about.json";

export default function EventHighlights() {
    const { title, heading, description, items } = aboutData.eventHighlights;

    return (
        <section className="py-20 bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{title}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{heading}</h3>
                    <p className="mt-4 text-gray-600">{description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, idx) => (
                        <div key={idx} className="tilt-card group bg-white rounded-3xl overflow-hidden border border-gray-100 flex flex-col">
                            <div className="h-48 overflow-hidden relative">
                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors z-10"></div>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6 flex-grow">
                                <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
