import homeData from "@/data/home.json";

export default function StatsSection() {
    const { stats } = homeData;

    return (
        <section className="relative py-20 -mt-10 z-40">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent transform -skew-y-2 origin-top-left h-full w-full shadow-2xl"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center text-white transform hover:scale-105 transition-transform duration-300"
                        >
                            <div className="mb-4 p-3 bg-white/20 rounded-full">
                                <span className="material-symbols-outlined text-3xl">{stat.icon}</span>
                            </div>
                            <h3 className="text-5xl font-black mb-2 tracking-tight">{stat.value}</h3>
                            <p className="text-blue-100 font-medium text-lg">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
