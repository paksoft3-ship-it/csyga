"use client";

import { useState } from "react";
import homeData from "@/data/home.json";

export default function TestimonialsSection() {
    const { testimonials } = homeData;
    const [currentSlide, setCurrentSlide] = useState(0);

    const moveSlide = (direction) => {
        let newSlide = currentSlide + direction;
        if (newSlide < 0) {
            newSlide = testimonials.items.length - 1;
        } else if (newSlide >= testimonials.items.length) {
            newSlide = 0;
        }
        setCurrentSlide(newSlide);
    };

    return (
        <section className="py-20 bg-background-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">{testimonials.title}</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{testimonials.heading}</h3>
                    <p className="mt-4 text-gray-600">{testimonials.description}</p>
                </div>

                <div className="relative">
                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-xl transition-all -ml-6"
                        onClick={() => moveSlide(-1)}
                    >
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>

                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-xl transition-all -mr-6"
                        onClick={() => moveSlide(1)}
                    >
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>

                    <div className="overflow-hidden mx-8">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {testimonials.items.map((testimonial, idx) => (
                                <div key={idx} className="min-w-full flex-shrink-0 px-4">
                                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-3xl mx-auto">
                                        <div className="text-primary/20 mb-6">
                                            <span className="material-symbols-outlined text-5xl">format_quote</span>
                                        </div>
                                        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                                            {`"${testimonial.quote}"`}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                                                {testimonial.initials}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{testimonial.author}</h4>
                                                <p className="text-gray-500 text-sm">{testimonial.country}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-8 gap-2">
                        {testimonials.items.map((_, idx) => (
                            <button
                                key={idx}
                                className={`w-3 h-3 rounded-full transition-colors ${currentSlide === idx ? "bg-primary" : "bg-gray-300"}`}
                                onClick={() => setCurrentSlide(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
