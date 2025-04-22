import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TProduct } from "@/types";
import Image from "next/image";
import React from "react";
import { Eye } from "lucide-react";
interface ManageWishlistProps {
  products: TProduct[];
}

const ManageWishlist: React.FC<ManageWishlistProps> = ({ products }) => {
  return (
    <div className="grid gap-4 p-4 max-w-4xl mx-auto">
      {products.map((product: TProduct) => (
        <Card
          key={product._id}
          className="rounded-lg shadow-lg bg-white p-6 flex flex-col md:flex-row items-center justify-between w-full gap-4 transition-all hover:shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
            {/* Image section */}
            <div className="flex-shrink-0">
              <Image
                // src={product?.images[0] || ""}
                src={product.images[] || ""}
                alt={product.title}
                width={120}
                height={120}
                className="rounded-lg object-cover shadow-md"
              />
            </div>

            {/* Info section */}
            <div className="flex flex-col md:flex-row items-center justify-start gap-4 w-full">
              <h3 className="text-xl font-semibold text-gray-800">
                {product.title}
              </h3>

              {/* Price */}
              <p className="text-lg text-gray-700">{product.price}</p>

              {/* Stock */}
              <p
                className={cn(
                  "text-sm font-medium",
                  product.status === "available"
                    ? "text-green-600"
                    : "text-red-500"
                )}
              >
                {product.status}
              </p>

              {/*  View Button with Eye Icon */}

              <Button
                variant="outline"
                className="mt-4 md:mt-0 flex items-center gap-1 border-gray-300 text-gray-700 hover:text-blue-600 hover:border-gray-500 transition-colors"
              >
                <Eye className="w-4 h-4" />
                View
              </Button>


              {/* Add to Cart button */}
              <Button
                className="mt-4 md:mt-0 py-2 px-4 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition-all"
                disabled={product.status !== "available"}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ManageWishlist;
