"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addAddress, orderSelector, removeFromCart } from "@/redux/features/cartSlice";
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
        dispatch(removeFromCart());
      } else {
        toast.error("Order Failed");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="border-2 border-gray dark:bg-slate-800 brightness-105 rounded-md w-full p-5 lg:max-w-96">
      <div className="flex flex-col justify-between h-full">
        <h1 className="text-2xl font-bold mb-1">
          Shipping Address
        </h1>
        <div className="my-5">
          <Textarea
            onChange={(e) => handleShippingAddress(e.target.value)}
            placeholder="Enter your shipping address"
            rows={5}
            className="border-1 dark:bg-slate-600 dark:text-slate-200"
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
