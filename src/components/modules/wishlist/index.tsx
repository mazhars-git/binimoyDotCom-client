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


type ProductType = {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  condition: string;
  images?: string[];
};

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
                src={product.images[0] || ""}
                alt={product.title}
                width={120}
                height={120}
                className="rounded-lg object-cover shadow-md"
              />
            </div>

type WishlistItemType = {
  _id: string;
  productId: ProductType;
};

type Props = {
  products: WishlistItemType[];
};

const ManageWishlist = ({ products }: Props) => {
  const router = useRouter();

  const handleAddToCart = (product: ProductType) => {
    // API call
    console.log("Added to cart:", product);
    alert(`${product.title} added to cart`);
  };

  const handleViewDetails = (productId: string) => {
    // p.page
    router.push(`/product/${productId}`);
  };

  const handleRemoveFromWishlist = (wishlistId: string) => {
    // wrapi
    console.log("Removed from wishlist:", wishlistId);
    alert("Item removed from wishlist");
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
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-lg text-foreground">
                  {product.category}
                </p>
                <p className="font-semibold text-lg text-foreground">
                  ৳{product.price}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {product.condition}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(product._id)}
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
        );
      })}
      
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
