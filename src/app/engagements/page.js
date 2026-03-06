import PageHeader from "@/components/ui/PageHeader";
import SummitBanner from "@/components/engagements/SummitBanner";
import GenericEngagement from "@/components/engagements/GenericEngagement";
import Workshops from "@/components/engagements/Workshops";
import engagementsData from "@/data/engagements.json";

export default function EngagementsPage() {
    const { header, dynamicEngagements, diplomacySimulations, culturalDiplomacy } = engagementsData;

    return (
        <>
            <PageHeader
                title={header.title}
                badge={header.badge}
                description={header.description}
                bgImage={header.bgImage}
            />
            <SummitBanner />

            <GenericEngagement
                id="dynamic"
                data={dynamicEngagements}
                imageGradient="from-primary/20 to-accent/20"
                bulletIconColor="text-accent"
                ctaBg="bg-primary"
                ctaHoverBg="hover:bg-primary/90"
            />

            <div className="bg-background-light">
                <GenericEngagement
                    id="simulations"
                    data={diplomacySimulations}
                    imageGradient="from-primary/20 to-accent/20"
                    bulletIconColor="text-accent"
                    ctaBg="bg-accent"
                    ctaHoverBg="hover:bg-accent/90"
                    reverseLayout={true}
                />
            </div>

            <Workshops />

            <GenericEngagement
                id="cultural"
                data={culturalDiplomacy}
                imageGradient="from-primary/20 to-accent/20"
                bulletIconColor="text-accent"
                ctaBg="bg-primary"
                ctaHoverBg="hover:bg-primary/90"
                reverseLayout={true}
            />
        </>
    );
}
