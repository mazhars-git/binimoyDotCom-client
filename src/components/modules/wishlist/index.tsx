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
import { useRouter } from "next/navigation";
import { IProduct } from "@/types";
import { IWishlist } from "@/types/wishlist";
import { deleteSingleWishlist } from "@/services/wishlist";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { addToCart } from "@/redux/features/cartSlice";

type ManageWishlistProps = {
  products: IWishlist[];
};

const ManageWishlist: React.FC<ManageWishlistProps> = ({ products }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleAddToCart = async (product: IProduct, id: string) => {
    dispatch(addToCart(product));
    if (product._id) {
      await deleteSingleWishlist(id);
      toast.success("Product added to cart");
      router.push("/cart");
    } else {
      toast.error("Product ID is missing");
    }
  };

  const handleViewDetails = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      const result = await deleteSingleWishlist(productId);
      if (result?.success) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    <div>
      <div>
        <h2 className="text-2xl text-center mt-5 font-bold mb-4">
          Your Wishlist
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((item: IWishlist) => (
          <Card
            key={item._id}
            className="rounded-2xl shadow-md transition hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle>{item?.productId?.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {item?.productId?.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={item?.productId.images[0] || ""}
                alt={item?.productId.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-lg text-foreground">
                  {item?.productId?.category}
                </p>
                <p className="font-semibold text-lg text-foreground">
                  $ {item?.productId?.price}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {item?.productId?.condition}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleAddToCart(item?.productId, item?._id)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={item?.productId?.status !== "available"}
                  onClick={() => handleViewDetails(item?.productId._id)}
                >
                  View Details
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveFromWishlist(item._id)}
                >
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageWishlist;
