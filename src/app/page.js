import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import QuoteSection from "@/components/home/QuoteSection";
import EngagementsGrid from "@/components/home/EngagementsGrid";
import EventsTabs from "@/components/home/EventsTabs";
import GallerySection from "@/components/home/GallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <QuoteSection />
      <EngagementsGrid />
      <EventsTabs />
      <GallerySection />
      <TestimonialsSection />
    </>
  );
}
