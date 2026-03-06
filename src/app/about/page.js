import PageHeader from "@/components/ui/PageHeader";
import VisionFocus from "@/components/about/VisionFocus";
import MissionVisionSection from "@/components/about/MissionVisionSection";
import CorePillars from "@/components/about/CorePillars";
import WhyCsyga from "@/components/about/WhyCsyga";
import GlobalFootprint from "@/components/about/GlobalFootprint";
import EventHighlights from "@/components/about/EventHighlights";
import LeadershipGovernance from "@/components/about/LeadershipGovernance";
import AboutPartnersSlider from "@/components/about/AboutPartnersSlider";
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
            <VisionFocus />
            <MissionVisionSection />
            <CorePillars />
            <WhyCsyga />
            <GlobalFootprint />
            <EventHighlights />
            <LeadershipGovernance />
            <AboutPartnersSlider />
        </>
    );
}
