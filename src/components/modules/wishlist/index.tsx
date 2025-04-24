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
import { HeartOff } from "lucide-react";

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
        <div className="bg-muted rounded-xl p-8 shadow-lg text-center max-w-md">
          <HeartOff className="mx-auto text-muted-foreground mb-4" size={48} />
          <p className="text-2xl font-semibold text-muted-foreground mb-2">
            Your wishlist is empty
          </p>
          <p className="text-sm text-muted-foreground">
            Start adding your favorite items now!
          </p>
        </div>
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

              {/* Button section */}
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="default" size="sm">
                  Add to Cart
                </Button>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="destructive" size="sm">
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ManageWishlist;
