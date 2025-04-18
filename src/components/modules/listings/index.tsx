"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const ManageListings = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold">Manage Listing Products</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/dashboard/listing/add-product")}
            size="sm"
          >
            Add Product <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageListings;
