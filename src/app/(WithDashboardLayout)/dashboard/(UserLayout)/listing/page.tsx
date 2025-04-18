import ManageListings from "@/components/modules/listings";
import { getAllProducts } from "@/services/Product";
import React from "react";

const ManageListingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllProducts(page, "3");
  return (
    <div>
      <ManageListings />
    </div>
  );
};

export default ManageListingsPage;
