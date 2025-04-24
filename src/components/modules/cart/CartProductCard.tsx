import { Button } from "@/components/ui/button";
import {
  CartProduct,
  decrementOrderQuantity,
  incrementOrderQuantity,
  removeProduct,
} from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hook";

import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CartProductCard({ product }: { product: CartProduct }) {
  const dispatch = useAppDispatch();
  const handleIncrement = (id: string) => {
    dispatch(incrementOrderQuantity(id));
  };
  const handleDecrement = (id: string) => {
    dispatch(decrementOrderQuantity(id));
  };
  const handleRemove = (id: string) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="bg-white rounded-lg flex p-5 gap-5">
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
            <span className="text-gray-500">Stock Availability:</span>{" "}
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
            <p className="text-gray-500 font-semibold">Quantity:</p>
            <Button
              onClick={() => handleDecrement(product._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Minus />
            </Button>
            <p className="font-semibold text-xl p-2">
              {product?.orderQuantity}
            </p>
            <Button
              onClick={() => handleIncrement(product._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Plus />
            </Button>

            <Button
              onClick={() => handleRemove(product._id)}
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
