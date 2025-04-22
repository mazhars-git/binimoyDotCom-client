"use client";

import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SearchBar = ({ searchOption }: { searchOption: string }) => {
  const [searchTerm, setSearchTerm] = useState(searchOption);
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  //handle search into onChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTermEvent = e.target.value;
    setSearchTerm(searchTermEvent);
    const params = new URLSearchParams(searchParams);
    if (searchTermEvent) {
      params.set("searchTerm", searchTermEvent);
    } else {
      params.delete("searchTerm");
    }
    if (params.toString()) {
      replace(`/products?${params.toString()}`);
    } else {
      replace("/products");
    }
  };

  //Clear the search input
  const handleSearchCross = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams);
    params.delete("searchTerm");
    if (params.toString()) {
      replace(`/products?${params.toString()}`);
    } else {
      replace("/products");
    }
  };
  return (
    <div className="w-full bg-gray-200 p-6 my-5">
      <Input
        type="text"
        placeholder="Search..."
        className="border-2 border-secondary p-6 focus:ring-0 flex-grow px-3 bg-white relative"
        value={searchTerm}
        onChange={handleChange}
      />
      <button
        onClick={handleSearchCross}
        className="ml-2 text-gray-500 hover:text-gray-700 absolute right-10 top-32"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
export default SearchBar;
