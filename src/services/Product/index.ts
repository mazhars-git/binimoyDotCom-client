export const getAllProducts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/products`, {
      next: {
        tags: ["PRODUCT"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
