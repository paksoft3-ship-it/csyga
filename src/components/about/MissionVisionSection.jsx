import aboutData from "@/data/about.json";

export default function MissionVisionSection() {
    const { mission, vision } = aboutData.missionVision;

    return (
        <section className="py-20 bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Mission Card */}
                    <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20">
                        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">target</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">{mission.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-lg mb-4">{mission.p1}</p>
                        <p className="text-gray-600 leading-relaxed">{mission.p2}</p>
                    </div>

                    {/* Vision Card */}
                    <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-accent/20">
                        <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">visibility</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">{vision.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-lg mb-4">{vision.p1}</p>
                        <p className="text-gray-600 leading-relaxed">{vision.p2}</p>
                    </div>

                </div>
            </div>
        </section>
    );
}
