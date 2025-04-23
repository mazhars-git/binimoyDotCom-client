"use client";

import Image from "next/image";
import emptyCart from "@/assets/empty-cart.jpg";
import CartProductCard from "./CartProductCard";

export default function Cart() {
  return (
    <div>
      <div className="text-center pt-5">
        <p className="text-2xl font-bold text-orange-500">Cart is empty!!</p>
      </div>

      <div className="flex justify-center items-center">
        <Image src={emptyCart} alt="empty cart" width={400} height={400} />
      </div>

      <div className="py-5">
        <CartProductCard />
      </div>
    </div>
  );
}
