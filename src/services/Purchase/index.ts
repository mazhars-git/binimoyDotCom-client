import { cookies } from "next/headers";

export const getAllPurchases = async (buyerId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/order/purchase/${buyerId}`,
      {
        method: "GET",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error: any) {
    return new Error(error);
  }
};


