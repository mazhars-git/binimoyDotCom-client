import { Button } from "@/components/ui/button";
import styles from "./HeroSection.module.css";
import RUContainer from "@/components/ui/core/RUContainer";
import Link from "next/link";

const HeroSection = () => {
  return (
    <RUContainer>
      <div
        className={`${styles.banner} flex items-center border-2 border-white rounded-3xl max-h-[70vh] mt-10`}
      >
        <div className="justify-start items-center gap-4">
          <div className="pl-12">
            <h1 className="sm:text-4xl text-2xl font-bold leading-normal">
              Don&apos;t Miss Out on <br /> These Unbeatable Black <br /> Friday
              Deals!
            </h1>
            <p className="my-5 leading-7">
              Save big this Black Friday with unbeatable deals on tech, home
              essentials, <br /> fashion, and more! Limited stock.
            </p>
            <Link href="/products">
              <Button
                size="lg"
                className="mr-5 rounded-full hover:bg-slate-100 hover:text-black"
              >
                Buy Now
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                className="rounded-full bg-white text-black hover:bg-gray-100"
              >
                All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </RUContainer>
  );
};

export default HeroSection;
