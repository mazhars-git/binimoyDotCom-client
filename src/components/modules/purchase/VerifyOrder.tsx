"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/ui/core/spinner";
import { verifyOrder } from "@/services/Cart";
import { PaymentTransaction } from "@/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyOrder = () => {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("order_id");

  const [isLoading, setIsLoading] = useState(true);

  const [orderData, setOrderData] = useState<PaymentTransaction | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!orderId) return;

      try {
        const { data } = await verifyOrder(orderId);
        setOrderData(data?.[0]);
      } catch (error) {
        console.log("data fetch failed ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="icon" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 dark:bg-s shadow-lg rounded-2xl">
      <h1 className="text-2xl md:text-4xl font-bold">Order Verification</h1>
      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <p>
            <strong>Order ID:</strong> {orderData?.order_id}
          </p>
          <p>
            <strong>Amount:</strong> {orderData?.currency}{" "}
            {orderData?.amount?.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {orderData?.bank_status}
          </p>
        </CardContent>
      </Card>
      {/* Payment Info */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 ">
          <p>
            <strong>Method:</strong> {orderData?.method}
          </p>
          <p>
            <strong>Transaction ID:</strong> {orderData?.bank_trx_id}
          </p>
          <p>
            <strong>Invoice No:</strong> {orderData?.invoice_no}
          </p>
          <p>
            <strong>SP Code:</strong> {orderData?.sp_code}
          </p>
        </CardContent>
      </Card>
      {/* Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 ">
          <p>
            <strong>Name:</strong> {orderData?.name}
          </p>
          <p>
            <strong>Email:</strong> {orderData?.email}
          </p>
          <p>
            <strong>Phone:</strong> {orderData?.phone_no}
          </p>
          <p>
            <strong>Address:</strong> {orderData?.address}, {orderData?.city}
          </p>
        </CardContent>
      </Card>
      {/* Back Button */}
      <div className="text-center">
        <Link href="/products">
          <Button className="px-6 py-2">Back to Product</Button>
        </Link>
      </div>
        
    </div>
  );
};

export default VerifyOrder;
