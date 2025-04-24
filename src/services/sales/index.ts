"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllSales = async (sellerId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/order/sales/${sellerId}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        next: { tags: ["sales"] },
      }
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    return new Error(error);
  }
};

export const MarkAsSolidListing = async (orderId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/order/${orderId}`,
      {
        method: "PUT",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }),
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const result = await res.json();
    revalidateTag("PRODUCT");
    return result;
  } catch (error: any) {
    console.error("Error marking as sold:", error);
    throw error;
  }
};
