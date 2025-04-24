import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/core/ProductCard";
import RUContainer from "@/components/ui/core/RUContainer";
import { getAllListings } from "@/services/Product";
import { IProduct } from "@/types";
import Link from "next/link";

const FeaturedProducts = async () => {
  const { data: products } = await getAllListings();
  return (
    <RUContainer className="my-16">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Link href="/products">
          <Button className="rounded-full">All Collection</Button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-10">
        {products?.slice(0, 4).map((product: IProduct, idx: number) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </RUContainer>
  );
};

export default FeaturedProducts;
