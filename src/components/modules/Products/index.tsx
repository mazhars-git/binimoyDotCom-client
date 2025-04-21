"use client";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/core/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TProduct } from "@/types";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ProductsContainer = ({ products }: { products: TProduct[] }) => {
  const [priceSort, setPriceSort] = useState("price");
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  params.get("category");
  const handleValueChange = (value: string) => {
    setPriceSort(value);

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("searchTerm");
    }
    if (params.toString()) {
      replace(`/products?${params.toString()}`);
    } else {
      replace("/products");
    }
  };
  const handleDeleteSearchQuery = (queryTerm: string) => {
    params.delete(queryTerm);
    if (params.toString()) {
      replace(`/products?${params.toString()}`);
    } else {
      replace("/products");
    }
  };
  return (
    <div className="w-[90%] md:container mx-auto space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          {params.get("category") && (
            <h3 className="text-xl text-primary font-semibold">
              {params.get("category")}
            </h3>
          )}
          {params.get("condition") && (
            <h3 className="text-xl text-primary font-semibold">
              {params.get("condition")}
            </h3>
          )}
          {params.get("location") && (
            <h3 className="text-xl text-primary font-semibold">
              {params.get("location")}
            </h3>
          )}
        </div>
        <Select onValueChange={handleValueChange} defaultValue={priceSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-price">Price:Highest</SelectItem>
            <SelectItem value="price">Price:Lowest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-2 md:col-span-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {params.get("category") && (
              <Button
                variant={"destructive"}
                className="rounded-full cursor-pointer"
                onClick={() => handleDeleteSearchQuery("category")}
              >
                {params.get("category")!.length > 9
                  ? `${params.get("category")?.slice(0, 9)}..`
                  : params.get("category")}
                <X />
              </Button>
            )}
            {params.get("condition") && (
              <Button
                variant={"destructive"}
                className="rounded-full cursor-pointer"
                onClick={() => handleDeleteSearchQuery("condition")}
              >
                {params.get("condition")}
                <X />
              </Button>
            )}
            {params.get("location") && (
              <Button
                variant={"destructive"}
                className="rounded-full cursor-pointer"
                onClick={() => handleDeleteSearchQuery("location")}
              >
                {params.get("location")}
                <X />
              </Button>
            )}
          </div>
        </div>
        <div className="col-span-3 md:col-span-4 space-y-3">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products?.length ? (
              products?.map((product, idx) => (
                <ProductCard key={idx} product={product}></ProductCard>
              ))
            ) : (
              <h1>No result</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;