import RUContainer from "@/components/ui/core/RUContainer";

const AllProductsPage = async () => {
  return (
    <RUContainer>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="mt-4 text-gray-600">Home - All Products</p>
      </div>
    </RUContainer>
  );
};

export default AllProductsPage;
