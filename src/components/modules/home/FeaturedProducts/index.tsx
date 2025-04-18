import { Button } from "@/components/ui/button";
import RUContainer from "@/components/ui/core/RUContainer";
import Link from "next/link";
import React from "react";

const FeaturedProducts = () => {
  return (
    <RUContainer>
      <div className="py-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link href="/products">
            <Button className="rounded-full">All Collection</Button>
          </Link>
        </div>
      </div>
    </RUContainer>
  );
};

export default FeaturedProducts;
