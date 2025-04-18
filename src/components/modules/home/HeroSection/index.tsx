import { Button } from "@/components/ui/button";
import styles from "./HeroSection.module.css";
import RUContainer from "@/components/ui/core/RUContainer";

const HeroSection = () => {
  return (
    <RUContainer>
      <div
        className={`${styles.banner} flex items-center border-2 border-white rounded-3xl  mt-10`}
      >
        <div className="justify-start items-center gap-4">
          <div className="pl-12">
            <h1 className="text-4xl font-bold leading-normal">
              Don&apos;t Miss Out on <br /> These Unbeatable Black <br /> Friday
              Deals!
            </h1>
            <p className="my-5 leading-7">
              Save big this Black Friday with unbeatable deals on tech, home
              essentials, <br /> fashion, and more! Limited stock.
            </p>
            <Button size="lg" className="mr-5 rounded-full">
              Buy Now
            </Button>
            <Button
              size="lg"
              className="rounded-full bg-white text-black hover:bg-gray-100"
            >
              All Products
            </Button>
          </div>
        </div>
      </div>
    </RUContainer>
  );
};

export default HeroSection;
