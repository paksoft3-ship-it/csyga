import Image from "next/image";
import homeData from "@/data/home.json";

export default function GallerySection() {
    const { gallery } = homeData;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{gallery.title}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{gallery.heading}</h3>
                    <p className="mt-4 text-gray-600">{gallery.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.images.map((img, idx) => (
                        <div
                            key={idx}
                            className={`gallery-item relative group rounded-2xl overflow-hidden ${img.large ? "col-span-2 row-span-2 h-80 md:h-auto" : "h-40"}`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                            />
                            <div className="gallery-overlay">
                                <h4 className={`text-white font-bold ${img.large ? "text-lg" : ""}`}>{img.title}</h4>
                                {img.desc && <p className="text-gray-300 text-sm">{img.desc}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}
