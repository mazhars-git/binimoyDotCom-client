"use client";
import Image from "next/image";
import emptyCart from "@/assets/empty-cart.jpg";
import CartProductCard from "./CartProductCard";
import { useAppSelector } from "@/redux/hook";
import { orderedProductSelector } from "@/redux/features/cartSlice";

export default function Cart() {
  const product = useAppSelector(orderedProductSelector);

  return (
    <div className="col-span-8 row-span-3 h-full space-y-5">
      {product.title === "" ? (
        <div className="text-center pt-5">
          <p className="text-2xl font-bold text-orange-500">Cart is empty!!</p>

          <div className="flex justify-center items-center">
            <Image src={emptyCart} alt="empty cart" width={400} height={400} />
          </div>
        </div>
      ) : (
        <CartProductCard product={product} />
      )}
    </div>
  );
}
