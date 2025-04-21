"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

const SMPagination = ({ totalPage }: { totalPage: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const setPagination = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    if (params.toString()) {
      replace(`${pathName}?${params.toString()}`);
    } else {
      replace(pathName);
    }
  };
  const handlePreButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPagination(currentPage - 1);
    }
  };
  const handleNextutton = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      setPagination(currentPage + 1);
    }
  };
  return (
    <div className="flex gap-4 justify-end items-center">
      <Button
        onClick={handlePreButton}
        disabled={currentPage === 1}
        variant={"outline"}
        className="w-8 h-8 flex justify-center items-center cursor-pointer"
      >
        <ArrowLeft />
      </Button>
      {[...Array(totalPage)].map((_, idx) => (
        <Button
          key={idx + 1}
          onClick={() => {
            setCurrentPage(idx + 1);
            setPagination(idx + 1);
          }}
          variant={currentPage === idx + 1 ? "default" : "outline"}
          className="w-8 h-8 flex justify-center items-center cursor-pointer"
        >
          {idx + 1}
        </Button>
      ))}
      <Button
        onClick={handleNextutton}
        disabled={currentPage === totalPage}
        variant={"outline"}
        className="w-8 h-8 flex justify-center items-center cursor-pointer"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default SMPagination;