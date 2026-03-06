import Image from "next/image";
import Link from "next/link";
import homeData from "@/data/home.json";

export default function HeroSection() {
    const { hero, stats } = homeData;

    return (
        <section className="relative pt-20 min-h-[92vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    alt="CSYGA Youth Diplomacy"
                    src={hero.image}
                    fill
                    priority
                    className="object-cover object-center scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark/95 via-primary/70 to-accent/40 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/95 via-transparent to-background-dark/30 z-20"></div>
                <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl z-30"></div>
                <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl z-30"></div>
                <Image
                    alt=""
                    src="/file.svg"
                    fill
                    aria-hidden
                    className="z-40 object-cover opacity-[0.04] mix-blend-screen"
                />
            </div>

            <div className="relative z-50 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 grid lg:grid-cols-12 gap-10 items-end">
                    <div className="lg:col-span-8 text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/25 text-white mb-7">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            <span className="text-xs font-bold tracking-[0.14em] uppercase">{hero.badge}</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.03] tracking-tight max-w-5xl [text-shadow:0_4px_16px_rgba(0,0,0,0.5)]">
                            Cultivating <span className="text-blue-100">Strategic Youth</span> for Global Action
                        </h1>

                        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-100/95 leading-relaxed max-w-3xl [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
                            {hero.description}
                        </p>

                        <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-xl">
                            {hero.buttons.map((btn, idx) => (
                                <Link
                                    key={idx}
                                    href={btn.href}
                                    className={`w-full sm:w-auto flex items-center justify-center gap-2 h-14 px-7 rounded-full font-bold text-sm sm:text-base transition-all hover:-translate-y-0.5 ${btn.primary
                                        ? "bg-primary hover:bg-blue-600 text-white shadow-[0_10px_30px_rgba(18,73,151,0.45)]"
                                        : "bg-white/12 hover:bg-white/20 border border-white/40 text-white backdrop-blur-sm"
                                        }`}
                                >
                                    <span>{btn.label}</span>
                                    <span className="material-symbols-outlined text-[20px]">{btn.icon}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-4 lg:justify-self-end w-full lg:max-w-sm">
                        <div className="rounded-2xl border border-white/20 bg-background-dark/60 backdrop-blur-xl p-5 sm:p-6 shadow-[0_20px_55px_rgba(0,0,0,0.35)]">
                            <p className="text-xs uppercase tracking-[0.18em] text-blue-100/90 mb-4">Global Footprint</p>
                            <div className="space-y-3">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="flex items-center justify-between rounded-xl bg-white/8 border border-white/15 px-4 py-3">
                                        <div>
                                            <p className="text-white text-2xl font-extrabold leading-none">{stat.value}</p>
                                            <p className="text-blue-100/90 text-xs sm:text-sm mt-1">{stat.label}</p>
                                        </div>
                                        <span className="material-symbols-outlined text-blue-100/90 text-2xl">{stat.icon}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
