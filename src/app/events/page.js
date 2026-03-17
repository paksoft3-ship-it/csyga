"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DEADLINE_ISO = "2026-04-30T23:59:59+03:00";

const summitThemes = [
  {
    title: "Humanitarian Diplomacy in the Digital Age",
    description:
      "Technology-driven humanitarian response, digital protection systems, negotiation in fragile contexts, and multi-stakeholder coordination in crisis environments.",
    icon: "public",
  },
  {
    title: "Crisis Diplomacy & Global Stability",
    description:
      "Strategic negotiation, emergency governance frameworks, digital governance in conflict settings, and crisis communication in high-risk scenarios.",
    icon: "shield",
  },
  {
    title: "Technology, Youth & Climate Nexus",
    description:
      "AI in humanitarian action, youth-led diplomacy, digital ethics, climate-induced displacement, and innovation-driven global cooperation.",
    icon: "eco",
  },
];

const institutionalVisitAreas = [
  "Humanitarian diplomacy",
  "Disaster response and coordination",
  "Refugee protection and field operations",
  "Crisis management & emergency communications",
];

const networkingHighlights = [
  "High-level interactions with diplomats and humanitarian experts",
  "Networking dinner",
  "Cultural exchange activities",
  "Collaborative policy working groups",
];

const participationCategories = [
  {
    title: "Fully Funded Scholarships",
    subtitle: "10 Fully Funded Scholarships Available",
    body:
      "Outstanding applicants will receive a fully funded opportunity to attend the summit.",
    includes: [
      "Shared accommodation",
      "Full summit access (19-21 June 2026)",
      "Workshops & policy sessions",
      "Summit materials",
      "Official institutional visits",
    ],
    notes: [
      "Application Fee: $9.99",
      "Applicants in this category are automatically considered for the Free Summit Access Pass if not selected for full funding.",
    ],
    cta: "Apply Now",
    tone: "primary",
  },
  {
    title: "Free Summit Access Pass",
    subtitle: "30 Free Access Spots Available",
    body:
      "Designed for high-potential applicants who may not require accommodation support.",
    includes: [
      "Full summit access",
      "Workshops & sessions",
      "Summit materials",
      "Official visits",
      "Accommodation and travel are not included",
    ],
    notes: [
      "No separate application required - fully funded applicants are automatically considered.",
    ],
    cta: "Apply Now",
    tone: "accent",
  },
  {
    title: "Progressive Enrollment Plan (Installment Model)",
    subtitle: "Flexible option for participants needing visa documentation",
    body:
      "This model supports international participants who require invitation documents before completing full payment.",
    includes: [
      "Step 1: Initial Enrollment Fee - $100",
      "Official Invitation Letter",
      "Conditional confirmation of participation",
      "Option to upgrade to Full Experience",
      "Step 2: Completion Fee - $300 (Forum Access) or $600 (Full Experience)",
      "Full payment must be completed prior to the summit",
    ],
    notes: [],
    cta: "Apply Now",
    tone: "neutral",
  },
  {
    title: "Summit Access Pass - $400",
    subtitle: "Guaranteed participation upon payment",
    body: "Ideal for delegates who want a direct confirmed seat in the summit.",
    includes: [
      "Summit access",
      "Workshops",
      "Summit materials",
      "Official visits",
    ],
    notes: [],
    cta: "Apply Now",
    tone: "primary",
  },
  {
    title: "Complete Summit Experience - $700",
    subtitle: "Guaranteed participation upon payment",
    body:
      "Premium package for participants seeking the full summit and accommodation experience.",
    includes: [
      "Full summit access",
      "Workshops",
      "Official visits",
      "Shared hotel accommodation",
      "Bosphorus Cruise Dinner Experience",
    ],
    notes: [],
    cta: "Apply Now",
    tone: "accent",
  },
];

const timelineItems = [
  {
    title: "Applications Open",
    date: "Currently Open",
    detail: "Rolling review begins immediately.",
  },
  {
    title: "Fully Funded Deadline",
    date: "April 30, 2026",
    detail: "Last date for scholarship consideration.",
  },
  {
    title: "Shortlist Announcement",
    date: "Mid-May 2026",
    detail: "Selected candidates will receive direct email notification.",
  },
  {
    title: "Summit Dates",
    date: "June 19-21, 2026",
    detail: "In-person summit in Istanbul, Turkiye.",
  },
];

const eligibilityItems = [
  {
    title: "Who Can Apply?",
    content:
      "The Digital Diplomacy Summit 2026 in Istanbul welcomes motivated individuals from diverse academic and professional backgrounds who are passionate about humanitarian and crisis diplomacy in the digital era.",
  },
  {
    title: "Eligible Backgrounds",
    list: [
      "Undergraduate, Graduate, and PhD students",
      "Young professionals (18-35 years old)",
      "Policy practitioners and civil society actors",
      "Humanitarian workers and NGO representatives",
      "Individuals from diplomacy, international relations, law, public policy, governance, technology, and related disciplines",
      "Emerging leaders with demonstrated interest in global cooperation and crisis response",
    ],
  },
  {
    title: "Nationality",
    content:
      "The summit is open to applicants of all nationalities. Diverse regional representation is strongly encouraged.",
  },
  {
    title: "Language Requirement",
    content:
      "The working language of the summit is English. Participants should have basic working proficiency to actively engage in discussions, workshops, and networking sessions.",
  },
  {
    title: "Selection Criteria",
    list: [
      "Demonstrated motivation and leadership potential",
      "Interest in humanitarian and crisis diplomacy",
      "Commitment to community, policy, or international engagement",
      "Diversity of background and geographic representation",
    ],
  },
];

const faqItems = [
  {
    question: "Is the summit fully funded?",
    answer:
      "Yes. 10 Fully Funded Scholarships and 30 Free Summit Access Passes are available. Applicants in the Fully Funded category are automatically considered for Free Access if not selected for full funding.",
  },
  {
    question: "What does the Fully Funded Scholarship include?",
    list: [
      "Free shared accommodation",
      "Full summit access",
      "Workshops",
      "Summit materials",
      "Official institutional visits",
    ],
  },
  {
    question: "What is the application fee?",
    answer:
      "The application fee is $9.99 USD for Fully Funded and Free Access categories. It covers administrative processing, committee review, and applicant communications. The fee is non-refundable.",
  },
  {
    question: "What is the Progressive Enrollment Plan?",
    list: [
      "Step 1: Initial Enrollment Fee - $100",
      "Official Invitation Letter",
      "Confirmation of selection",
      "Upgrade opportunity",
      "Step 2: Completion Fee - $300 (Forum Access) or $600 (Full Experience)",
      "Full payment must be completed to attend",
    ],
  },
  {
    question: "Is the summit in-person or virtual?",
    answer: "The summit will be held in person in Istanbul from June 19 to June 21, 2026.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. All participants receive an official Certificate of Participation upon completion of the summit.",
  },
  {
    question: "Do I need prior diplomatic experience?",
    answer:
      "No. The summit welcomes both emerging leaders and experienced professionals. Selection is based on motivation and engagement potential.",
  },
  {
    question: "What happens after I apply?",
    list: [
      "Applications are reviewed on a rolling basis",
      "Fully Funded Deadline: April 30, 2026",
      "Shortlist Announcement: Mid-May 2026",
    ],
  },
  {
    question: "Can I upgrade my participation category later?",
    answer:
      "Yes. Participants under the installment model may upgrade to the Complete Summit Experience, subject to availability.",
  },
  {
    question: "Is visa support provided?",
    answer:
      "Yes. Participants with a guaranteed spot, confirmed installment applicants, and selected funded/free delegates receive an Official Invitation Letter for visa support. Visa decisions and costs remain under embassy policies and participant responsibility.",
  },
];

const partnerLogos = [
  "/bab.jpeg",
  "/tugva.png",
  "/udef.png",
  "/tisup.png",
  "/Ababeel.png",
];

function getTimeLeft() {
  const now = new Date();
  const target = new Date(DEADLINE_ISO);
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { expired: false, days, hours, minutes, seconds };
}

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-semibold text-gray-900">{item.title || item.question}</span>
        <span className="material-symbols-outlined text-primary">{isOpen ? "remove" : "add"}</span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-gray-600 leading-relaxed">
          {item.content && <p>{item.content}</p>}
          {item.answer && <p>{item.answer}</p>}
          {item.list && (
            <ul className="space-y-2">
              {item.list.map((entry, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-accent text-base mt-0.5">check_circle</span>
                  <span>{entry}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function categoryClasses(tone) {
  if (tone === "primary") {
    return {
      badge: "bg-primary/10 text-primary",
      button: "bg-primary hover:bg-primary/90 text-white",
    };
  }
  if (tone === "accent") {
    return {
      badge: "bg-accent/10 text-accent",
      button: "bg-accent hover:bg-accent/90 text-white",
    };
  }
  return {
    badge: "bg-background-light text-gray-700",
    button: "bg-background-dark hover:bg-background-dark/90 text-white",
  };
}

export default function EventsPage() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());
  const [openEligibility, setOpenEligibility] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const statItems = useMemo(
    () => [
      { value: "3", label: "Summit Days" },
      { value: "10", label: "Fully Funded Scholarships" },
      { value: "30", label: "Free Access Spots" },
      { value: "100+", label: "Delegates" },
    ],
    []
  );

  return (
    <>
      <section className="relative min-h-[86vh] pt-20 flex items-center overflow-hidden">
        <Image
          src="/DigitalDiplomacySummit2026.jpeg"
          alt="Digital Diplomacy Summit 2026 in Istanbul"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/95 via-primary/75 to-accent/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-transparent to-background-dark/25" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 text-white text-xs uppercase tracking-[0.14em] font-bold">
              <span className="material-symbols-outlined text-base">location_on</span>
              Istanbul, Turkiye
            </p>
            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05]">
              Digital Diplomacy Summit 2026
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/90 max-w-3xl">
              Shaping the Future of Humanitarian & Crisis Diplomacy Through Digital Innovation
            </p>
            <p className="mt-5 text-white/90 font-semibold">
              Istanbul, Turkiye | 19-21 June 2026
            </p>
            <div className="mt-8">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-background-light transition-colors"
              >
                Apply Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
              {statItems.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/12 border border-white/20 backdrop-blur-sm p-4 text-center">
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <p className="text-white/90 text-xs uppercase tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 bg-background-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 rounded-2xl border border-white/20 bg-white/5 p-6 md:p-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black">Application Deadline Countdown</h2>
              <p className="text-white/80 mt-2">Fully Funded Deadline: April 30, 2026</p>
            </div>
            {timeLeft.expired ? (
              <p className="text-accent font-bold">Deadline has passed.</p>
            ) : (
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 min-w-[74px]">
                    <p className="text-2xl font-black leading-none">{String(unit.value).padStart(2, "0")}</p>
                    <p className="text-xs uppercase tracking-wide text-white/80 mt-1">{unit.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">About the Summit</h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
              <p>
                The Digital Diplomacy Summit 2026 brings together young leaders, policy practitioners, and innovators to explore how digital tools, emerging technologies, and modern communication strategies are reshaping humanitarian and crisis diplomacy.
              </p>
              <p>
                Hosted in Istanbul, home to leading international organizations and humanitarian networks, the summit provides a platform for delegates to learn, connect, and experience diplomacy in action.
              </p>
            </div>
            <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
              <Image src="/DigitalDiplomacySummit2026.jpeg" alt="Istanbul summit backdrop" fill className="object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">Summit Themes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {summitThemes.map((theme) => (
              <div key={theme.title} className="rounded-2xl bg-white border border-gray-100 p-7 shadow-sm">
                <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined">{theme.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{theme.title}</h3>
                <p className="text-gray-600">{theme.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-5">Institutional Visits</h2>
            <p className="text-gray-600 mb-6">
              Delegates will visit key organizations in Turkiye involved in:
            </p>
            <ul className="space-y-3">
              {institutionalVisitAreas.map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-700">
                  <span className="material-symbols-outlined text-accent mt-0.5">check_circle</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-5">Cultural & Field Experience</h2>
            <div className="rounded-2xl border border-gray-100 bg-background-light p-6 mb-4">
              <h3 className="font-bold text-gray-900 mb-2">Humanitarian Field Exposure</h3>
              <p className="text-gray-600">
                Learn how organizations use digital tools in real-time humanitarian decision-making.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-background-light p-6">
              <h3 className="font-bold text-gray-900 mb-2">Istanbul City Tour</h3>
              <p className="text-gray-600">
                Explore historic diplomatic quarters and global heritage landmarks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Networking & Engagement</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {networkingHighlights.map((item) => (
              <div key={item} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">groups</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" id="participation-categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">Participation Categories</h2>
          <div className="grid gap-6">
            {participationCategories.map((category) => {
              const styles = categoryClasses(category.tone);
              return (
                <div key={category.title} className="border border-gray-100 rounded-3xl p-7 bg-background-light">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${styles.badge}`}>
                    {category.subtitle}
                  </span>
                  <h3 className="text-2xl font-black text-gray-900 mt-4">{category.title}</h3>
                  <p className="text-gray-600 mt-3">{category.body}</p>

                  <div className="mt-5 grid md:grid-cols-2 gap-6">
                    <ul className="space-y-2">
                      {category.includes.map((inc) => (
                        <li key={inc} className="flex items-start gap-2 text-gray-700">
                          <span className="material-symbols-outlined text-accent text-base mt-0.5">check_circle</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                    <div>
                      {category.notes.map((note) => (
                        <p key={note} className="text-sm text-gray-600 mb-2">
                          {note}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link href="/apply" className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-colors ${styles.button}`}>
                      {category.cta}
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">Application Timeline</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/30" />
            <div className="space-y-7">
              {timelineItems.map((item) => (
                <div key={item.title} className="relative pl-12">
                  <div className="absolute left-1.5 top-1.5 size-5 rounded-full bg-primary border-4 border-white" />
                  <div className="bg-white border border-gray-100 rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-widest text-primary font-bold">{item.date}</p>
                    <h3 className="text-lg font-bold text-gray-900 mt-1">{item.title}</h3>
                    <p className="text-gray-600 mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" id="eligibility">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">Eligibility Criteria</h2>
          <div className="space-y-4">
            {eligibilityItems.map((item, idx) => (
              <AccordionItem
                key={item.title}
                item={item}
                isOpen={openEligibility === idx}
                onToggle={() => setOpenEligibility(openEligibility === idx ? -1 : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background-light" id="faq">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <AccordionItem
                key={item.question}
                item={item}
                isOpen={openFaq === idx}
                onToggle={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
          <h2 className="text-3xl font-black text-gray-900 mb-8">Partners & Sponsors</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {partnerLogos.map((logo) => (
              <div key={logo} className="rounded-lg border border-gray-100 bg-background-light h-16 flex items-center justify-center px-1 overflow-hidden">
                <Image src={logo} alt="Partner logo" width={170} height={80} className="object-contain max-h-14 w-auto scale-125" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black">Ready to Join Global Diplomacy Leaders in Istanbul?</h2>
          <div className="mt-8">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-background-light transition-colors"
            >
              Apply Now
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="fixed bottom-5 right-5 z-[220]">
        <Link
          href="/apply"
          className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-full shadow-xl hover:bg-primary/90 transition-colors font-bold"
        >
          Apply Now
          <span className="material-symbols-outlined text-base">north_east</span>
        </Link>
      </div>
    </>
  );
}
