import PageHeader from "@/components/ui/PageHeader";
import ContactSection from "@/components/engage/ContactSection";
import SocialMediaGrid from "@/components/engage/SocialMediaGrid";
import data from "@/data/getInvolved.json";

export default function EngagePage() {
    const { header } = data.engage;

    return (
        <>
            <PageHeader
                title={header.title}
                description={header.description}
                bgImage={header.bgImage}
            />
            <ContactSection />
            <SocialMediaGrid />
        </>
    );
}
