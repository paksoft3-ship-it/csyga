import Image from "next/image";
import Link from "next/link";
import homeData from "@/data/home.json";

export default function EngagementsGrid() {
    const { engagements } = homeData;

    // Colors mapping for styling differences (based on HTML design: purple, blue, green, etc.)
    const colorMap = [
        { bg: "bg-blue-100", text: "text-primary" },
        { bg: "bg-green-100", text: "text-accent" },
        { bg: "bg-purple-100", text: "text-purple-600" }
    ];

    return (
        <section className="py-20 bg-white relative" id="engagements">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{engagements.title}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{engagements.heading}</h3>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{engagements.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {engagements.items.map((item, idx) => {
                        const colors = colorMap[idx % colorMap.length];
                        return (
                            <div key={idx} className="tilt-card group bg-background-light rounded-3xl overflow-hidden border border-gray-100 h-full flex flex-col">
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/0 transition-colors z-10"></div>
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-grow relative z-20">
                                    <div className={`size-12 rounded-xl flex items-center justify-center mb-6 ${colors.bg} ${colors.text}`}>
                                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{item.description}</p>
                                    <Link
                                        href={item.link}
                                        className={`inline-flex items-center font-bold transition-colors hover:opacity-75 ${colors.text}`}
                                    >
                                        Learn More <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
