"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import {
  grandTotalSelector,
  orderSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hook";
import { createOrder } from "@/services/Cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentDetails() {
  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const order = useAppSelector(orderSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const router = useRouter();
  const { userDetail } = useUser();
  console.log(userDetail)


  const handleOrder = async () => {
    try {
      if (!userDetail?._id) {
        toast.error("Please login...");
        router.push("/login");
        return;
      }

      const productsWithSeller = order.products.map((product) => ({
        product: product.product,
        sellerID: product.sellerID, 
        quantity: product.quantity,
      }));

      const payload = {
        buyerID: userDetail._id,
        products: productsWithSeller,
        address: order.shippingAddress,
      };

      const result = await createOrder(payload);

      if (result?.success && result?.data?.checkout_url) {
        toast.success(result?.message);
        window.location.href = result.data.checkout_url;
      } else {
        console.log(result)
        toast.error(result?.message || "Order failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while placing the order.");
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
