"use client";
// import { deleteProductListing, getAllListings } from "@/server-actions/product";ss
import { deleteProductListing, getAllListings } from "@/services/Product";

export const getAllProducts = async () => {
  try {
    const res = await getAllListings();
    return { success: true, data: res };
  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false };
  }
};

export const deleteProductById = async (productId: string) => {
  try {
    const res = await deleteProductListing(productId);
    return { success: true, data: res };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false };
  }
};
