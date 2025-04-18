import CategoryPage from "@/components/modules/home/Category";
import HeroSection from "@/components/modules/home/HeroSection/index";

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoryPage />
    </div>
  );
}
