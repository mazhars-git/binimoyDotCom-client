// "use client";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { TProduct } from "@/types";
// import Image from "next/image";
// import React from "react";
// import { Eye } from "lucide-react";

// interface ManageWishlistProps {
//   products: TProduct[];
// }

// const ManageWishlist: React.FC<ManageWishlistProps> = ({ products }) => {
//   console.log(products);
//   return (
//     <div className="grid gap-4 p-4 max-w-4xl mx-auto">
//       {products.map((product: TProduct) => (
//         <Card
//           key={product._id}
//           className="rounded-lg shadow-lg bg-white p-6 flex flex-col md:flex-row items-center justify-between w-full gap-4 transition-all hover:shadow-xl"
//         >
//           <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
//             {/* Image section */}
//             <div className="flex-shrink-0">
//               <Image
//                 src={
//                   product.images && product.images.length > 0
//                     ? product.images[0]
//                     : "/default-image.jpg"
//                 } // Default image if no product image
//                 alt={product.title}
//                 width={120}
//                 height={120}
//                 className="rounded-lg object-cover shadow-md"
//               />
//             </div>

//             {/* Info section */}
//             <div className="flex flex-col md:flex-row items-center justify-start gap-4 w-full">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {product.title}
//               </h3>

//               {/* Price */}
//               <p className="text-lg text-gray-700">{product.price}</p>

//               {/* Stock */}
//               <p
//                 className={cn(
//                   "text-sm font-medium",
//                   product.status === "available"
//                     ? "text-green-600"
//                     : "text-red-500"
//                 )}
//               >
//                 {product.status}
//               </p>

//               {/* View Button with Eye Icon */}
//               <Button
//                 variant="outline"
//                 className="mt-4 md:mt-0 flex items-center gap-1 border-gray-300 text-gray-700 hover:text-blue-600 hover:border-gray-500 transition-colors"
//               >
//                 <Eye className="w-4 h-4" />
//                 View
//               </Button>

//               {/* Add to Cart button */}
//               <Button
//                 className="mt-4 md:mt-0 py-2 px-4 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 transition-all"
//                 disabled={product.status !== "available"}
//               >
//                 Add to Cart
//               </Button>
//             </div>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// };

// export default ManageWishlist;
////////////////////////////////////////////////

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type ProductType = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  condition: string;
  images?: string[];
};

type WishlistItemType = {
  _id: string;
  productId: ProductType;
};

type Props = {
  products: WishlistItemType[];
};
const ManageWishlist = ({ products }: Props) => {
  console.log(products, "products getting");
  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl text-muted-foreground">
          Your wishlist is empty 💤
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((item) => {
        const product = item.productId;

        return (
          <Card
            key={item._id}
            className="rounded-2xl shadow-md transition hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle>{product.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {product.images?.[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex justify-between items-center">
                <p className="font-semibold text-lg text-foreground">
                  ৳{product?.category}
                </p>
                <p className="font-semibold text-lg text-foreground">
                  ৳{product.price}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {product.condition}
                </p>
              </div>
              <Button variant="destructive" size="sm" className="mt-4 w-full">
                Remove
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ManageWishlist;
