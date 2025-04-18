import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/HeroSection/index";

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
    </div>
  );
}
