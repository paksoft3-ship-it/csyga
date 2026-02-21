import data from "@/data/getInvolved.json";

export default function SocialMediaGrid() {
    const { title, subtitle, networks } = data.engage.social;

    return (
        <section className="py-20 bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {networks.map((network, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition text-center tilt-card">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${network.bgGradient}`}>
                                <i className={`${network.iconClass} text-white text-2xl`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{network.name}</h3>
                            <p className="text-gray-600 text-sm mb-4">{network.description}</p>
                            <a
                                href={network.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-5 py-2 rounded-full font-semibold hover:bg-primary hover:text-white transition text-sm"
                            >
                                {network.btnText}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
