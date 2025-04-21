import UpdateListingForm from "@/components/modules/listings/UpdateListingForm";
import { IProduct } from "@/types";
import React from "react";

const page = ({ product }: { product: IProduct }) => {
  return (
    <div>
      <UpdateListingForm product={product} />
    </div>
  );
};

export default page;
