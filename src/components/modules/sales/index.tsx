"use client";
import { RUTable } from "@/components/ui/core/RUTable";
import { TTransaction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MarkAsSolidListing } from "@/services/sales";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

const SalesHistory = ({ trnasactions }: { trnasactions: TTransaction[] }) => {
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  const handleMarkAsSold = async (orderId: string) => {
    setUpdatingIds((prev) => {
      const newSet = new Set(prev);
      newSet.add(orderId);
      return newSet;
    });

    try {
      const result = await MarkAsSolidListing(orderId);
      if (result?.success) {
        toast.success("Order status updated to completed");
      }
    } catch (error) {
      toast.error("Failed to update order", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setUpdatingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  const columns: ColumnDef<TTransaction>[] = [
    {
      accessorKey: "product",
      header: () => (
        <span className="font-medium text-foreground/80">ITEM DETAILS</span>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 min-w-[40px] overflow-hidden rounded-lg border bg-muted">
            <Image
              src={
                row.original.product?.images?.[0] || "/product-placeholder.svg"
              }
              alt={row.original.product.title}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <p className="font-medium line-clamp-1">
              {row.original.product.title}
            </p>
            <p className="text-xs text-muted-foreground">
              Ref: {row.original.transaction.id.slice(0, 8)}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "seller",
      header: () => (
        <span className="font-medium text-foreground/80">VENDOR</span>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.original.sellerId.name}</div>
      ),
    },
    {
      accessorKey: "buyer",
      header: () => (
        <span className="font-medium text-foreground/80">CUSTOMER</span>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.original.buyerId.name}</div>
      ),
    },
    {
      accessorKey: "price",
      header: () => (
        <span className="font-medium text-foreground/80">AMOUNT</span>
      ),
      cell: ({ row }) => (
        <div className="font-semibold text-foreground">
          ${row.original.product.price.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: () => (
        <span className="font-medium text-foreground/80">DATE SOLD</span>
      ),
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {format(
            new Date(row.original?.transaction?.date_time),
            "MMM dd, yyyy"
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => (
        <span className="font-medium text-foreground/80">STATUS</span>
      ),
      cell: ({ row }) => {
        const status = row.original.status.toLowerCase();
        return (
          <Badge
            variant={status === "completed" ? "default" : "outline"}
            className={
              status === "completed"
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-600 border-amber-500/20"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <span className="font-medium text-foreground/80">ACTIONS</span>
      ),
      cell: ({ row }) => {
        const isUpdating = row.original.product._id ? updatingIds.has(row.original.product._id) : false;
        const isCompleted = row.original.status.toLowerCase() === "completed";

        return (
          <Button
            size="sm"
            variant={isCompleted ? "ghost" : "default"}
            className="gap-1.5"
            disabled={isCompleted || isUpdating}
            onClick={() => handleMarkAsSold(row.original._id)}
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="h-4 w-4" />
            )}
            <span>{isCompleted ? "Completed" : "Mark Sold"}</span>
          </Button>
        );
      },
    },
  ];

  return (
    <div className="space-y-4 p-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales History</h1>
          <p className="text-sm text-muted-foreground">
            Showing {trnasactions.length}{" "}
            {trnasactions.length === 1 ? "transaction" : "transactions"}
          </p>
        </div>
      </div>

      <RUTable
        columns={columns}
        data={trnasactions || []}
        searchKey="product.title"
        className="rounded-xl border bg-background/50 backdrop-blur-sm"
      />
    </div>
  );
};

export default SalesHistory;
