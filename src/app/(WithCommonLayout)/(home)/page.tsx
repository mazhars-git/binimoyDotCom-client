import ContactSection from "@/app/(WithCommonLayout)/contact/page";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FeatureSection from "@/components/modules/home/FeatureSection";
import HeroSection from "@/components/modules/home/HeroSection/index";
import QnaSection from "@/components/modules/home/QnaSection";

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <FeatureSection/>
      <QnaSection/>
      <ContactSection/>
    </div>
  );
}
