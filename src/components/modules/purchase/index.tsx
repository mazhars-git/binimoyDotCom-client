"use client";
import { RUTable } from "@/components/ui/core/RUTable";
import { TTransaction } from "@/types/purchaseHistory";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";


const PurchaseHistory = ({ transactions }: { transactions: TTransaction[] }) => {
  const columns: ColumnDef<TTransaction>[] = [
    {
      accessorKey: "product",
      header: "Item Details",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 min-w-[40px] overflow-hidden rounded-md border">
            <Image
              src={row?.original?.product?.images?.[0] || "/placeholder-item.jpg"}
              alt={row?.original?.product?.title}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div>
            <p className="font-medium line-clamp-1">{row?.original?.product?.title}</p>
            <p className="text-xs text-muted-foreground">
              ID: {row.original.transaction.id.slice(0, 8)}
            </p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "buyerId.name",
      header: "Purchased By",
      cell: ({ row }) => <span className="font-medium">{row?.original?.buyerId?.name}</span>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <span className="font-semibold">${row?.original?.product?.price?.toFixed(2)}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.original?.transaction?.date_time).toLocaleDateString()}
        </span>
      ), 
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row?.original?.status;
        return (
          <Badge 
            variant={status === 'completed' ? 'default' : 'outline'}
            className={status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
          >
            {status.toUpperCase()}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="space-y-4 p-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Inventory Transactions</h1>
          <p className="text-sm text-muted-foreground">
            {transactions.length} {transactions.length === 1 ? 'item' : 'items'} in record
          </p>
        </div>
      </div>
      
      <RUTable 
        columns={columns} 
        data={transactions}
        searchKey="product.title"
        className="rounded-lg border"
      />
    </div>
  );
};

export default PurchaseHistory;
