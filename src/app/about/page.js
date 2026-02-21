import PageHeader from "@/components/ui/PageHeader";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import CorePillars from "@/components/about/CorePillars";
import WhyCsyga from "@/components/about/WhyCsyga";
import GlobalFootprint from "@/components/about/GlobalFootprint";
import EventHighlights from "@/components/about/EventHighlights";
import aboutData from "@/data/about.json";

export default function AboutPage() {
    const { title, badge, description, bgImage } = aboutData.header;

    return (
        <>
            <PageHeader
                title={title}
                badge={badge}
                description={description}
                bgImage={bgImage}
            />
            <MissionVisionSection />
            <CorePillars />
            <WhyCsyga />
            <GlobalFootprint />
            <EventHighlights />
        </>
    );
}
