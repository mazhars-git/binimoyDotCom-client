"use client";

import { deleteListedProduct } from '@/services/Product';

import { getAllListings } from "../Product";

// import { deleteProductListing, getAllListings } from "@/server-actions/product";ss

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
    const res = await deleteListedProduct(productId);
    return { success: true, data: res };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false };
  }
};
