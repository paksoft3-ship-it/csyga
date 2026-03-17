import PageHeader from "@/components/ui/PageHeader";
import MultiStepForm from "@/components/apply/MultiStepForm";

export default async function ApplyPage({ searchParams }) {
    const { plan } = await searchParams;
    return (
        <>
            <PageHeader
                title="Apply Now"
                description="Digital Diplomacy Summit 2026 Application"
                bgImage="/DigitalDiplomacySummit2026.jpeg"
            />
            <section className="py-16 bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-12 lg:p-16">
                        <MultiStepForm plan={plan || ""} />
                    </div>
                </div>
            </section>
        </>
    );
}
