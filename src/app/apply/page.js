import PageHeader from "@/components/ui/PageHeader";
import MultiStepForm from "@/components/apply/MultiStepForm";

export default function ApplyPage() {
    return (
        <>
            <PageHeader
                title="Apply Now"
                description="Digital Diplomacy Summit 2026 Application"
                bgImage="/images/4.jpg"
            />
            <section className="py-16 bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-12 lg:p-16">
                        <MultiStepForm />
                    </div>
                </div>
            </section>
        </>
    );
}
