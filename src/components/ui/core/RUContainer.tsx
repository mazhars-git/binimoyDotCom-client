import React, { ReactNode } from "react";

interface RUContainerProps {
  children: ReactNode;
  className?: string;
}

const RUContainer = ({ children, className = "" }: RUContainerProps) => {
  return (
    <div className={`container mx-auto px-5 ${className}`}>{children}</div>
  );
};

export default RUContainer;
