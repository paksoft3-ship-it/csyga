import Image from "next/image";
import aboutData from "@/data/about.json";

export default function LeadershipGovernance() {
    const { title, description, advisors } = aboutData.leadership;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl p-8 md:p-12 border border-gray-100 bg-gradient-to-br from-background-dark via-primary to-accent text-white shadow-xl">
                    <div className="max-w-4xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-5">{title}</h2>
                        <p className="text-blue-100 max-w-4xl leading-relaxed text-lg">{description}</p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5">
                        {advisors.map((advisor, idx) => (
                            <div key={`${advisor.name}-${idx}`} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                                <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-white/10">
                                    <Image
                                        src={advisor.image}
                                        alt={`${advisor.name} headshot`}
                                        fill
                                        className="object-cover object-center"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm md:text-base font-bold text-white">{advisor.name}</h3>
                                <p className="text-xs md:text-sm text-blue-100">{advisor.role}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
