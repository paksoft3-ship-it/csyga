"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import siteData from "@/data/site.json";

export default function TopNavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="fixed top-0 w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-[#e8edf3]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-3 text-[#0e141b]">
                        <Link href="/">
                            <Image
                                src={siteData.logo}
                                alt={`${siteData.name} Logo`}
                                width={120}
                                height={56}
                                className="h-14 w-auto object-contain"
                            />
                        </Link>
                    </div>
                    <nav className="hidden lg:flex items-center gap-8">
                        {siteData.navigation.map((item, index) => (
                            item.dropdown ? (
                                <div key={index} className="relative group">
                                    <Link
                                        href={item.href}
                                        className="text-sm font-semibold hover:text-primary transition-colors text-gray-700 flex items-center gap-1"
                                    >
                                        {item.label}
                                        <span className="material-symbols-outlined text-sm">expand_more</span>
                                    </Link>
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="p-2">
                                            {item.dropdown.map((dropdownItem, idx) => (
                                                <Link
                                                    key={idx}
                                                    href={dropdownItem.href}
                                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-primary">{dropdownItem.icon}</span>
                                                    <span className="text-sm font-medium text-gray-700">{dropdownItem.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className="text-sm font-semibold hover:text-primary transition-colors text-gray-700"
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link
                            href={siteData.ctaButton.href}
                            className="hidden md:flex bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2.5 px-6 rounded-full transition-all shadow-md shadow-primary/20 items-center gap-2"
                        >
                            <span>{siteData.ctaButton.label}</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-600"
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {isMobileMenuOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </header>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="flex flex-col bg-white border-t border-gray-100 lg:hidden">
                    <div className="px-4 py-4 space-y-2">
                        {siteData.navigation.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="block px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href={siteData.ctaButton.href}
                            className="block px-4 py-3 rounded-lg bg-primary text-white font-bold text-center mt-4"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {siteData.ctaButton.label}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
