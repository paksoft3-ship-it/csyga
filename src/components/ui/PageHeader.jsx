import Image from "next/image";

export default function PageHeader({ title, badge, description, bgImage }) {
    return (
        <section className="relative pt-20 min-h-[72vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgImage}
                    alt={title}
                    fill
                    priority
                    className="object-cover object-center scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark/95 via-primary/70 to-accent/40 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/95 via-transparent to-background-dark/30 z-20"></div>
                <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl z-30"></div>
                <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl z-30"></div>
                <Image
                    src="/file.svg"
                    alt=""
                    fill
                    aria-hidden
                    className="z-40 object-cover opacity-[0.04] mix-blend-screen"
                />
            </div>
            <div className="relative z-50 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
                    <div className="max-w-5xl text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/25 text-white mb-7">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            <span className="text-xs font-bold tracking-[0.14em] uppercase">{badge || "CSYGA"}</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.03] tracking-tight max-w-5xl [text-shadow:0_4px_16px_rgba(0,0,0,0.5)]">
                            {title}
                        </h1>

                        {description && (
                            <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-100/95 leading-relaxed max-w-3xl [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]">
                                {description}
                            </p>
                        )}

                        <div className="mt-8 h-px w-28 bg-gradient-to-r from-white/70 to-white/0"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
