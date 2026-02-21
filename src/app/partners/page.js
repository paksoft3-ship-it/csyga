import PageHeader from "@/components/ui/PageHeader";
import PartnersGrid from "@/components/partners/PartnersGrid";
import PartnershipOpportunities from "@/components/partners/PartnershipOpportunities";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import partnersData from "@/data/partners.json";

export default function PartnersPage() {
    return (
        <>
            <PageHeader
                title={partnersData.header.title}
                description={partnersData.header.description}
                bgImage={partnersData.header.bgImage}
            />
            <PartnersGrid />
            <PartnershipOpportunities />

            {/* Testimonials block uses home data implicitly but matches perfectly */}
            <TestimonialsSection />
        </>
    );
}
