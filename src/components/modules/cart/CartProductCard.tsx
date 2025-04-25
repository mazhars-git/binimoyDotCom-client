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
    <div className="text-white dark:text-slate-600 bg-slate-400 dark:bg-slate-200 rounded-lg flex p-5 py-12 gap-5">
      <div className="h-full w-32 rounded-md overflow-hidden">
        <Image
          width={200}
          height={200}
          alt="product img"
          src={product?.images[0]}
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <h1 className="text-xl font-semibold">{product?.title}</h1>
        <div className="flex gap-5 my-2">
          <p>
            <span className="">Stock Availability:</span>{" "}
            <span className="font-semibold">{product?.status}</span>
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between">
          <h2>
            Price:
            {product.price}
          </h2>
          <div className="flex items-center gap-8">
            <p className="font-semibold">Quantity: {product.quantity}</p>

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
  );
}
