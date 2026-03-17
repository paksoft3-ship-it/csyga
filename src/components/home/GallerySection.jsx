import Image from "next/image";
import homeData from "@/data/home.json";

export default function GallerySection() {
    const { gallery } = homeData;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{gallery.title}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{gallery.heading}</h3>
                    <p className="mt-4 text-gray-600">{gallery.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gallery.images.map((image, index) => (
                        <div
                            key={`${image.src}-${index}`}
                            className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-gray-50"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                width={900}
                                height={700}
                                className={`h-72 w-full object-cover ${index === 1 ? "object-[center_36%]" : ""}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
