import ManageListings from "@/components/modules/listings";
import { getAllListings } from "@/services/Product";
import React from "react";

const ManageListingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllListings(page, "3");
  return (
    <div>
      <ManageListings products={data} meta={meta} />
    </div>
  );
};

export default ManageListingsPage;
