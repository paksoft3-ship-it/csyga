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
                iconName="forum"
                iconBgColor="bg-primary/10"
                iconTextColor="text-primary"
                imageGradient="from-blue-100 to-primary/20"
                bulletIconColor="text-accent"
                ctaBg="bg-primary"
                ctaHoverBg="hover:bg-blue-600"
            />

            <div className="bg-background-light">
                <GenericEngagement
                    id="simulations"
                    data={diplomacySimulations}
                    iconName="handshake"
                    iconBgColor="bg-accent/10"
                    iconTextColor="text-accent"
                    imageGradient="from-accent/20 to-blue-100"
                    bulletIconColor="text-accent"
                    ctaBg="bg-accent"
                    ctaHoverBg="hover:bg-green-600"
                    reverseLayout={true}
                />
            </div>

            <Workshops />

            <GenericEngagement
                id="cultural"
                data={culturalDiplomacy}
                iconName="diversity_3"
                iconBgColor="bg-amber-100"
                iconTextColor="text-amber-600"
                imageGradient="from-amber-100 to-orange-100"
                bulletIconColor="text-amber-500"
                ctaBg="bg-amber-500"
                ctaHoverBg="hover:bg-amber-600"
                reverseLayout={true}
            />
        </>
    );
}
