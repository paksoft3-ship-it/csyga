import homeData from "@/data/home.json";

export default function QuoteSection() {
    const { quote } = homeData;

    return (
        <section className="py-24 bg-background-light">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative p-1 rounded-3xl bg-gradient-to-r from-primary via-blue-400 to-accent">
                    <div className="bg-white rounded-[1.3rem] p-12 md:p-16 text-center relative overflow-hidden">
                        <div className="absolute top-6 left-8 text-primary/10">
                            <span className="material-symbols-outlined text-8xl">format_quote</span>
                        </div>
                        <figure className="relative z-10">
                            <blockquote className="text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed mb-8 font-sans">
                                {quote.text}
                            </blockquote>
                            <figcaption className="flex flex-col items-center justify-center gap-2">
                                <div className="h-1 w-12 bg-gradient-to-r from-primary to-accent rounded-full mb-2"></div>
                                <div className="font-bold text-primary text-lg">{quote.author}</div>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
}
