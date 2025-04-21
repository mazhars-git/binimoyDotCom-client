"use server";
import { IProduct } from "@/types";
// add or list product

import { cookies } from "next/headers";

export const addProductListings = async (
  productData: IProduct
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/listings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify(productData),
      }
    );
    return res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

// get all listings products

export const getAllListings = async (page?: string, limit?: string) => {
  const params = new URLSearchParams();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/listings`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
