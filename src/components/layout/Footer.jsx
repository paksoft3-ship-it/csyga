import Link from "next/link";
import Image from "next/image";
import siteData from "@/data/site.json";

export default function Footer() {
    return (
        <footer className="bg-[#0e141b] text-white pt-1">
            <div className="h-1.5 w-full bg-gradient-to-r from-primary via-blue-400 to-accent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-white rounded-xl p-2 inline-block">
                                <Image src={siteData.logo} alt={siteData.name} width={80} height={80} className="h-20 w-auto object-contain" />
                            </div>
                        </div>
                        <h3 className="text-lg font-bold">Cultivating Strategic Youth for Global Action</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering youth to become leaders in global diplomacy and international affairs through innovative programs and strategic partnerships.
                        </p>
                        <div className="flex gap-4">
                            <a className="size-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-colors" href="https://www.instagram.com/thecsyga/">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a className="size-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-colors" href="https://x.com/thecsyga">
                                <i className="fab fa-x-twitter"></i>
                            </a>
                            <a className="size-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-colors" href="https://www.linkedin.com/company/center-for-strategic-youth-global-affairs/about/?viewAsMember=true">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a className="size-10 rounded-full bg-white/5 hover:bg-primary flex items-center justify-center transition-colors" href="https://www.facebook.com/thecsyga">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link className="hover:text-primary transition-colors" href="/">Home</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/about">About Us</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/engagements">Our Engagements</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/partners">Partners</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/get-involved">Get Involved</Link></li>
                        </ul>
                    </div>

                    {/* Engage With Us */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Engage With Us</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary mt-0.5">mail</span>
                                <span>thecsyga@gmail.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary mt-0.5">phone</span>
                                <span>+90 501 599 05 66</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary mt-0.5 flex-shrink-0">location_on</span>
                                <span>Mehmet Akif Mah,<br />1. Muammer Aksoy Cad,<br />Bina 36, Daire 5,<br />Kucukcekmece, Istanbul</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Stay Connected</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest strategic insights.</p>
                        <form className="flex flex-col gap-3">
                            <input className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary text-white placeholder-gray-500" placeholder="Email address" type="email" />
                            <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors text-sm">Subscribe</button>
                        </form>
                    </div>

                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} CSYGA - Center for Strategic Youth Global Affairs. All rights reserved.</p>
                    <div className="flex justify-center items-center gap-2">
                        <a href="https://paksoft.com.tr" target="_blank" rel="noopener noreferrer" className="flex items-center group">
                            <span className="text-gray-500 mr-2 group-hover:text-primary transition-colors">Developed by</span>
                            <div className="flex items-center text-primary group-hover:text-accent transition-colors">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 -rotate-12">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.85 0 3.58-.5 5.08-1.38-.7.13-1.42.21-2.16.21-5.52 0-10-4.48-10-10S9.42 2.83 14.92 2.83c.74 0 1.46.08 2.16.21C15.58 2.5 13.85 2 12 2z" />
                                </svg>
                                <span className="font-bold text-lg tracking-wide ml-1">PakSoft</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
