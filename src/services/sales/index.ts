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