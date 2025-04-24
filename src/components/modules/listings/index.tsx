"use client";

import { Button } from "@/components/ui/button";
import { ABTable } from "@/components/ui/core/ABTable";
import { deleteListedProduct } from "@/services/Product";
import { IProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ManageListings = ({ products }: { products: IProduct[]; meta: any }) => {
  const router = useRouter();

  const handleDelete = async (productId: string) => {
    try {
      const res = await deleteListedProduct(productId);
      console.log(res);
      if (!res) {
        toast.message("Deleting Failed");
      }
      toast.success(res?.message);
    } catch (error) {
      console.error("Product deleting failed", error);
    }
    console.log("Deleting:", productId);
  };

  const columns: ColumnDef<IProduct>[] = [
    {
      accessorKey: "img",
      header: "Product Image",
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.images[0] as string}
            alt={row.original.title}
            width={40}
            height={40}
            className="w-8 h-8 rounded-4xl"
          />
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span>{row.original.category}</span>,
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => <span>{row.original.status}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center space-x-5">
          <button
            className="text-slate-500 hover:text-sky-500"
            title="View"
            onClick={() => router.push(`/products/${row.original._id}`)}
          >
            <Eye className="w-5 h-5" />
          </button>

          <button
            className="text-slate-500 hover:text-sky-500"
            title="Edit"
            onClick={() =>
              router.push(
                `/dashboard/listing/update-listing/${row.original._id}`
              )
            }
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            className="text-red-500 hover:text-red-700"
            title="Delete"
            onClick={() => handleDelete(row.original._id as string)}
          >
            <Trash className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold">Manage Listed Products</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/dashboard/listing/add-listing")}
            size="sm"
          >
            Add Product <Plus />
          </Button>
        </div>
      </div>
      <ABTable columns={columns} data={products || []} />
    </div>
  );
};

export default ManageListings;
