"use client";
import { useEffect, useState } from "react";
// import { IProduct } from "@/types";ss
import { IProduct } from "@/types";

import { getAllProducts, deleteProductById } from "@/services/Products";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminProductDeletingPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchProducts = async () => {
    setLoading(true);
    const res = await getAllProducts();
    if (res.success) {
      setProducts(res.data);
    } else {
      toast.error("Failed to load products");
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const res = await deleteProductById(id);
    if (res.success) {
      toast.success("Product deleted successfully");
      fetchProducts(); // Refresh
    } else {
      toast.error("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage All Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-md shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">{product.title}</p>
                <p className="text-sm text-gray-500">৳ {product.price}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    router.push(`/dashboard/update-listing/${product._id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(product._id!)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
