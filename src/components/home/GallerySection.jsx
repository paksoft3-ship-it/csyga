"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import homeData from "@/data/home.json";

function getSlides(images, perSlide) {
    const slides = [];
    for (let i = 0; i < images.length; i += perSlide) {
        slides.push(images.slice(i, i + perSlide));
    }
    return slides;
}

export default function GallerySection() {
    const { gallery } = homeData;
    const [activeSlide, setActiveSlide] = useState(0);
    const [cardsPerSlide, setCardsPerSlide] = useState(3);

    useEffect(() => {
        const updateCardsPerSlide = () => {
            if (window.innerWidth < 768) {
                setCardsPerSlide(1);
                return;
            }
            if (window.innerWidth < 1024) {
                setCardsPerSlide(2);
                return;
            }
            setCardsPerSlide(3);
        };

        updateCardsPerSlide();
        window.addEventListener("resize", updateCardsPerSlide);
        return () => window.removeEventListener("resize", updateCardsPerSlide);
    }, []);

    const slides = useMemo(
        () => getSlides(gallery.images, cardsPerSlide),
        [gallery.images, cardsPerSlide]
    );

    const slideCount = Math.max(slides.length, 1);
    const currentSlide = activeSlide % slideCount;

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % slideCount);
    };

    const prevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + slideCount) % slideCount);
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{gallery.title}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{gallery.heading}</h3>
                    <p className="mt-4 text-gray-600">{gallery.description}</p>
                </div>

                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {slides.map((slide, slideIdx) => (
                                <div key={slideIdx} className="w-full shrink-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {slide.map((img, idx) => (
                                            <div key={`${img.src}-${idx}`} className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-72">
                                                <Image
                                                    src={img.src}
                                                    alt={img.alt}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-background-dark/20 to-transparent" />
                                                <div className="absolute left-0 right-0 bottom-0 p-5">
                                                    <h4 className="text-white font-bold text-lg">{img.title}</h4>
                                                    {img.desc && <p className="text-white/85 text-sm mt-1">{img.desc}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={prevSlide}
                        className="absolute -left-2 md:-left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-primary"
                        aria-label="Previous gallery slide"
                    >
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute -right-2 md:-right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-primary"
                        aria-label="Next gallery slide"
                    >
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>

                <div className="flex justify-center items-center gap-2 mt-8">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveSlide(idx)}
                            className={`h-2.5 rounded-full transition-all ${currentSlide === idx ? "w-7 bg-primary" : "w-2.5 bg-gray-300"}`}
                            aria-label={`Go to gallery slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
