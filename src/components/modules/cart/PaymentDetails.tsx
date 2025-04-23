"use client";
import { Button } from "@/components/ui/button";
import {
  grandTotalSelector,
  orderSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hook";
import { createOrder } from "@/services/Cart";
import { toast } from "sonner";

export default function PaymentDetails() {
  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const order = useAppSelector(orderSelector);
  const grandTotal = useAppSelector(grandTotalSelector);

  const handleOrder = async () => {
    try {
      const res = await createOrder(order);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="border-2 border-gray bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500 ">Subtotal</p>
          {/* <p className="font-semibold">{currencyFormatter(subTotal)}</p> */}
          <p className="font-semibold">{subTotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Shipment Cost</p>
          {/* <p className="font-semibold">{currencyFormatter(shippingCost)}</p> */}
          <p className="font-semibold">{shippingCost}</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500 ">Grand Total</p>
        {/* <p className="font-semibold">{currencyFormatter(grandTotal)}</p> */}
        <p className="font-semibold">{grandTotal}</p>
      </div>
      <Button
        onClick={handleOrder}
        className="w-full text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
}
