import PageHeader from "@/components/ui/PageHeader";
import EventsTabs from "@/components/home/EventsTabs";

export default function EventsPage() {
    return (
        <>
            <PageHeader
                title="Our Events"
                description="Explore our calendar—join upcoming gatherings or revisit highlights from past programs."
                bgImage="/images/4.jpg"
            />

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Events</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find upcoming opportunities and browse our past activities.</p>
                    </div>
                    <EventsTabs />
                </div>
            </section>
        </>
    );
}
