"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import eventsData from "@/data/events.json";

export default function EventsTabs() {
    const [activeTab, setActiveTab] = useState("upcoming");

    return (
        <section className="py-20 bg-background-light" id="events">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Our Events</h2>
                        <p className="text-gray-600">Discover our events and explore both upcoming programs and past highlights.</p>
                    </div>

                    {/* Tabs */}
                    <div className="tabs bg-white p-1 rounded-full inline-flex shadow-sm">
                        <button
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "upcoming" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100 font-medium"}`}
                            onClick={() => setActiveTab("upcoming")}
                        >
                            Upcoming
                        </button>
                        <button
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${activeTab === "past" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100 font-medium"}`}
                            onClick={() => setActiveTab("past")}
                        >
                            Past
                        </button>
                    </div>
                </div>

                <div className="tab-panels">
                    {/* UPCOMING */}
                    {activeTab === "upcoming" && (
                        <div className="animate-in fade-in duration-300">
                            {eventsData.upcoming.map((event, idx) => (
                                <div key={idx} className="group flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 mb-6">
                                    <div className="lg:w-1/2 relative flex items-center justify-center bg-gray-50">
                                        {event.featured && (
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="px-4 py-2 bg-accent text-white text-xs font-bold rounded-full shadow-lg">Featured Event</span>
                                            </div>
                                        )}
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            width={900}
                                            height={600}
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-blue-50 text-primary text-xs font-bold rounded-full">{event.date}</span>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">location_on</span> {event.location}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{event.title}</h3>
                                        <ul className="text-gray-600 space-y-2 mb-6">
                                            {event.features.map((feature, fIdx) => (
                                                <li key={fIdx} className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-lg">
                                                        {fIdx === 0 ? "schedule" : "location_city"}
                                                    </span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-gray-600 mb-6">{event.description}</p>
                                        <Link
                                            href={event.link}
                                            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all w-fit"
                                        >
                                            <span>Apply Now</span>
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* PAST */}
                    {activeTab === "past" && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                            {eventsData.past.map((event, idx) => (
                                <div key={idx} className="group flex flex-col md:flex-row items-center bg-white p-2 rounded-2xl hover:shadow-lg transition-shadow border border-gray-100">
                                    <div className="w-full md:w-auto p-6 md:pr-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 min-w-[140px]">
                                        <span className="text-sm font-bold text-accent uppercase tracking-wider mb-1">{event.month}</span>
                                        <span className="text-3xl font-black text-gray-900">{event.day}</span>
                                    </div>
                                    <div className="flex-grow p-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-3 py-1 bg-blue-50 text-primary text-xs font-bold rounded-full">{event.location}</span>
                                            <span className="text-gray-400 text-sm flex items-center gap-1">
                                                <span className="material-symbols-outlined text-sm">{event.icon}</span> {event.details}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-1">{event.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="mt-10 text-center">
                    <Link href="/events" className="inline-flex items-center text-primary hover:text-accent font-bold transition-colors">
                        View All Events <span className="material-symbols-outlined ml-1">arrow_right_alt</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
