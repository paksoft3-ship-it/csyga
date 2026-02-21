import Image from "next/image";

export default function PageHeader({ title, badge, description, bgImage }) {
    return (
        <section className="relative pt-20 min-h-[500px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#111821]/90 via-[#195eb3]/80 to-[#111821]/70 z-10 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-light to-transparent z-20"></div>
                <Image
                    src={bgImage}
                    alt={title}
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>
            <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                {badge && (
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8">
                        <span className="text-xs font-bold tracking-wide uppercase">{badge}</span>
                    </div>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6 max-w-4xl mx-auto">
                    {title}
                </h1>
                {description && (
                    <p className="text-lg md:text-xl text-blue-100 font-normal leading-relaxed max-w-3xl mx-auto">
                        {description}
                    </p>
                )}
            </div>
        </section>
    );
}
