"use server";
import { IProduct } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// Add product
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

// Update listed product

export const updateListedProduct = async (
  productData: FieldValues,
  productId: string
): Promise<any> => {
  try {
    const accessToken = (await cookies()).get("accessToken")!.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/listings/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Update Product failed");
    }

    const result = res.json();
    revalidateTag("PRODUCT");
    return result;
  } catch (error: any) {
    return Error(error.message);
  }
};

// Get all products
export const getAllListings = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/listings`,
      {
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    return await res.json();
  } catch (error: any) {
    return Error(error.message);
  }
};

export const getSingleListing = async (productId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/listings/${productId}`,
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

export const deleteListedProduct = async (productId: string) => {
  try {
    const accessToken = (await cookies()).get("accessToken")!.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/listings/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        cache: "no-store",
        next: {
          tags: ["PRODUCT"],
        },
      }
    );
    const data = await res.json();
    revalidateTag("PRODUCT");
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
