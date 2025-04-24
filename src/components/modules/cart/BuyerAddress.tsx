"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addAddress, orderSelector } from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { createOrder } from "@/services/Cart";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function BuyerAddress() {
  const dispatch = useAppDispatch();
  const order = useAppSelector(orderSelector);
  const router = useRouter();
  const handleShippingAddress = (address: string) => {
    dispatch(addAddress(address));
  };

  const handleOrder = async () => {
    try {
      const res = await createOrder(order);
      toast.success(res?.message);
      if (res?.success && res?.data?.checkout_url) {
        router.push(res?.data?.checkout_url);
      } else {
        toast.error("Order Failed");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="border-2 border-gray bg-slate-300 brightness-105 rounded-md col-span-4 p-5 ">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold dark:text-gray-600 mb-1">
          Shipping Address
        </h1>
        <p className="text-gray-500">Enter your address.</p>
        <div className="mt-5">
          <Textarea
            onChange={(e) => handleShippingAddress(e.target.value)}
            rows={5}
            className="border-1"
          />
        </div>
        <div className="flex justify-center items-center pt-2">
          <Button onClick={handleOrder} className="w-full">
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
}
