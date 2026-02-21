import Image from "next/image";
import Link from "next/link";
import homeData from "@/data/home.json";

export default function HeroSection() {
    const { hero } = homeData;

    return (
        <section className="relative pt-20 min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#111821]/90 via-[#195eb3]/80 to-[#111821]/70 z-10 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-light to-transparent z-20"></div>
                <Image
                    alt="CSYGA Youth Diplomacy"
                    src={hero.image}
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                {/* Floating Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    <span className="text-xs font-bold tracking-wide uppercase">{hero.badge}</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6 max-w-5xl mx-auto drop-shadow-sm">
                    Cultivating <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Strategic Youth</span> for Global Action
                </h1>

                <p className="text-lg md:text-xl text-blue-100 font-normal leading-relaxed max-w-3xl mx-auto mb-10">
                    {hero.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {hero.buttons.map((btn, idx) => (
                        <Link
                            key={idx}
                            href={btn.href}
                            className={`w-full sm:w-auto flex items-center justify-center gap-2 h-14 px-8 rounded-full font-bold text-base transition-all transform hover:-translate-y-1 ${btn.primary
                                    ? "bg-primary hover:bg-blue-600 text-white shadow-xl shadow-blue-900/20"
                                    : "bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white"
                                }`}
                        >
                            {btn.primary ? (
                                <>
                                    <span>{btn.label}</span>
                                    <span className="material-symbols-outlined">{btn.icon}</span>
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">{btn.icon}</span>
                                    <span>{btn.label}</span>
                                </>
                            )}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
