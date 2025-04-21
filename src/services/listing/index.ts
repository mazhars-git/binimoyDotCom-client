export const getAllListing = async (query: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_API}/listings${query}`,
        {
          next: { tags: ["PRODUCT"] },
          cache: "no-cache",
        }
      );
      const result = res.json();
      return result;
    } catch (error: any) {
      return new Error(error);
    }
  };