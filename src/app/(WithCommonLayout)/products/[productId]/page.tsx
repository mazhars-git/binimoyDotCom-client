import ProductDetails from "@/components/modules/Products/productDetails";
import RUContainer from "@/components/ui/core/RUContainer";
import { getSingleListing } from "@/services/Product";

const productDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const { data: product } = await getSingleListing(productId);
  return (
    <RUContainer>
      <div className="pt-5">
        <h1 className="text-2xl font-bold text-center text-sky-400">
          Home - Product - Product Details
        </h1>
      </div>
      <div>
        <ProductDetails product={product} />
      </div>
    </RUContainer>
  );
};

export default productDetailsPage;
