"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/context/UserContext";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { createWishlist } from "@/services/wishlist";

import { TProduct } from "@/types";
import { Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: TProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: TProduct) => {
    dispatch(addProduct(product));
  };
  const { user, userDetail, setIsLoading } = useUser();

  const router = useRouter();

  const handleAddToWishList = async (
    productId: string,
    productUserId: string
  ) => {
    const modifiedData = {
      userId: productUserId,
      productId: productId,
    };

    if (!productUserId) {
      router.push("/login");
      toast.error("Please login..");
    } else {
      try {
        const result = await createWishlist(modifiedData);
        if (result?.success) {
          toast.success(result?.message);
        } else {
          toast.error(result?.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Card className="p-3">
      <CardHeader className="relative p-0 h-48 items-center justify-center">
        <Image
          src={
            product?.images?.[0] ||
            "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
          }
          width={240}
          height={50}
          alt="product image"
          className="rounded-sm h-48 object-cover"
        />
        {product?.status === "sold" ? (
          <div className="absolute left-2 top-2 bg-red-500 text-white px-2 rounded-md">
            {product.status}
          </div>
        ) : (
          <div className="absolute left-2 top-2 bg-green-600 text-white px-2 rounded-md">
            {product.status}
          </div>
        )}
      </CardHeader>

      <CardContent className=" p-0 mt-2">
        <Link href={`/product/${product?._id}`} passHref>
          <CardTitle className="font-bold cursor-pointer text-lg">
            {product?.title.length > 30
              ? product?.title?.slice(0, 30) + "..."
              : product?.title}
          </CardTitle>
        </Link>

        <div className="flex items-center justify-between my-2">
          <p className="text-sm text-gray-600 dark:text-white">
            <span className="font-semibold">$ {product?.price}</span>
          </p>

          <div className="flex items-center justify-center gap-1">
            <Star className="w-4 h-4" fill="orange" stroke="orange" />
            <Star className="w-4 h-4" fill="orange" stroke="orange" />
            <Star className="w-4 h-4" fill="orange" stroke="orange" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="block p-0">
        <div className="flex gap-2 items-center justify-between">
          <Link href={`/products/${product._id}`}>
            <Button size="sm" className="rounded-full cursor-pointer">
              View Details
            </Button>
          </Link>

          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={product?.status === "sold" ? true : false}
                    className="w-8 h-8 p-0 flex items-center justify-center rounded-full cursor-pointer text-muted-foreground border-muted-foreground dark:text-white dark:border-slate-100 dark:hover:bg-orange-400"
                    onClick={() =>
                      handleAddToWishList(
                        product?._id,
                        userDetail?._id as string
                      )
                    }
                  >
                    <Heart />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to Wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="w-8 h-8 p-0 flex items-center justify-center rounded-full cursor-pointer text-muted-foreground border-muted-foreground dark:text-white dark:border-slate-100 dark:hover:bg-orange-400"
                    variant="outline"
                    size="sm"
                    disabled={product?.status === "sold" ? true : false}
                    onClick={() => handleAddProduct(product)}
                  >
                    <ShoppingBag />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to Cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
