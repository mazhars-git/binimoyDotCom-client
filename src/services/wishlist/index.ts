"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createWishlist = async (data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API}/wishlish`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidateTag("WISHLIST");
    return result;
  } catch (error: any) {
    return new Error(error);
  }
};



export const getAllWishlist = async (userId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/wishlish/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: (await cookies()).get("accessToken")!.value,
          },
          next: {
            tags: ["WISHLIST"],
          },
        }
      );
      const result = await res.json();
      return result;
    } catch (error: any) {
      return new Error(error);
    }
  };



  export const deleteSingleWishlist = async (productId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/wishlish/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: (await cookies()).get("accessToken")!.value,
          },
        }
      );
      const result = await res.json();
      revalidateTag("WISHLIST");
      return result;
    } catch (error: any) {
      return new Error(error);
    }
  };


