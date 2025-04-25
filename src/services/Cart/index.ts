"use server";
import { IOrder } from "@/types/order";
import { cookies } from "next/headers";

export const createOrder = async (paymentPayload: IOrder) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API}/order`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentPayload),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};


export const verifyOrder = async (orderId:string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/order/verify?order_id=${orderId}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

