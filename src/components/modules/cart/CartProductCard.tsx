import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { IProduct } from "@/types";

import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CartProductCard({ product }: { product: IProduct }) {
  const dispatch = useAppDispatch();
  const handleRemove = () => {
    dispatch(removeFromCart());
  };

  return (
    <div className="dark:bg-slate-800 rounded-lg flex p-5 py-12 gap-5">
      <div className="h-full w-40 sm:w-56 md:w-64 rounded-md overflow-hidden">
        <Image
          width={400}
          height={400}
          alt="product img"
          src={product?.images[0]}
        />
      </div>
      <div className="flex flex-col justify-between gap-8 flex-grow">
        <div>
          <h1 className="md:text-xl text-xl text-left font-semibold">{product?.title}</h1>
          <div className="flex flex-col gap-2 text-left mt-6">
            <p>
              <span className="">Availability:</span>{" "}
              <span className="font-semibold">{product?.status}</span>
            </p>
            <p>
              <span className="">Product Details:</span>{" "}
              <span className="font-semibold">{product.description}</span>
            </p>
          </div>
        </div>
        <div className="">
          <hr className="my-1" />
          <div className="flex items-center justify-between">
            <div className="flex text-left flex-col sm:flex-row sm:gap-16 gap-2">
              <h2 className="font-semibold">
                Price:
                {product.price}
              </h2>
              <p className="font-semibold">Quantity: {product.quantity}</p>
            </div>
            <div className="flex items-center gap-8">
              <Button
                onClick={() => handleRemove()}
                variant="outline"
                className="size-8 rounded-sm"
              >
                <Trash className="text-red-500/50" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
