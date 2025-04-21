import ProductsContainer from "@/components/modules/Products";
import SearchBar from "@/components/modules/Products/SearchBar";
import SMPagination from "@/components/ui/core/ABPagination";

import { getAllListing } from "@/services/listing";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "SeccondMart | Products",
  description: "This is all product page of seccond mart project",
};
const AllProductPage = async (props: {
  searchParams?: Promise<{
    searchTerm?: string;
    location?: string;
    condition?: string;
    category?: string;
  }>;
}) => {
  //retrive search params obj and create url to navigate
  const searchObj = await props.searchParams;
  const params = new URLSearchParams(searchObj);
  const query = params.toString() ? `?${params.toString()}` : "";

  //retrive all listings with search query parameter
  const { data: products, meta } = await getAllListing(query);
  return (
    <div className="mb-10">
      <Suspense>
        <SearchBar searchOption={searchObj?.searchTerm || ""} />
        <ProductsContainer products={products} />
        <div className="container mx-auto my-5">
          <SMPagination totalPage={meta?.totalPage} />
        </div>
      </Suspense>
    </div>
  );
};

export default AllProductPage;