"use client";
import { RUTable } from "@/components/ui/core/RUTable";
import { TTransaction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const SalesHistory = ({ trnasactions }: { trnasactions: TTransaction[] }) => {
  const columns: ColumnDef<TTransaction>[] = [
    {
      accessorKey: "product",
      header: () => <span className="font-medium text-foreground/80">ITEM DETAILS</span>,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 min-w-[40px] overflow-hidden rounded-lg border bg-muted">
            <Image
              src={
                row.original.product?.images?.[0] ||
                "/product-placeholder.svg"
              }
              alt={row.original.product.title}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <p className="font-medium line-clamp-1">{row.original.product.title}</p>
            <p className="text-xs text-muted-foreground">
              Ref: {row.original.transaction.id.slice(0, 8)}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "seller",
      header: () => <span className="font-medium text-foreground/80">VENDOR</span>,
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.sellerId.name}
        </div>
      ),
    },
    {
      accessorKey: "buyer",
      header: () => <span className="font-medium text-foreground/80">CUSTOMER</span>,
      cell: ({ row }) => (
        <div className="font-medium">
          {row.original.buyerId.name}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: () => <span className="font-medium text-foreground/80">AMOUNT</span>,
      cell: ({ row }) => (
        <div className="font-semibold text-foreground">
          ${row.original.product.price.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: () => <span className="font-medium text-foreground/80">DATE SOLD</span>,
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {format(new Date(row.original.createdAt), "MMM dd, yyyy")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <span className="font-medium text-foreground/80">FULFILLMENT</span>,
      cell: ({ row }) => {
        const status = row.original.status.toLowerCase();
        return (
          <Badge 
            variant={status === 'sold' ? 'default' : 'outline'}
            className={
              status === 'sold' 
                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' 
                : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="space-y-4 p-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Chronicle</h1>
          <p className="text-sm text-muted-foreground">
            Transaction records • {trnasactions.length} entries
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