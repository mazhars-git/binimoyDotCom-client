import Spinner from "@/components/ui/core/spinner";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner size="icon" />
    </div>
  );
};

export default loading;
