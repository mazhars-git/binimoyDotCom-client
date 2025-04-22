import LoadingState from "@/components/ui/core/LoadingState";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LoadingState></LoadingState>
    </div>
  );
};

export default loading;
