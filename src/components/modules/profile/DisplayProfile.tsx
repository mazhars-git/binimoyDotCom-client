"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/types";
import Link from "next/link";

const DisplayProfile = ({
  user,
  totalPurchaseProduct,
  totalSoldProduct,
  totalProduct,
}: {
  user: IUser;
  totalPurchaseProduct: number;
  totalSoldProduct: number;
  totalProduct: number;
}) => {
  return (
    <div className="bg-gray-500 text-muted p-6 rounded-lg min-h-screen">
      <div className="flex flex-col items-center">
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <h4 className="text-muted">{user?.name}</h4>
        <p className="text-muted">{user?.email}</p>
        <p className="text-muted">{user?.phoneNumber}</p>
      </div>
      <div className="mt-6 bg-primary p-4 rounded-lg">
        <p>Total Purchased product:{totalPurchaseProduct}</p>
      </div>
      <div
        className="mt-4 bg-primary
      p-4 rounded-lg"
      >
        <p>Total Sold Product:{totalSoldProduct}</p>
      </div>
      <div className="mt-4 bg-primary p-4 rounded-lg">
        <p>Total Post Product:{totalProduct}</p>
      </div>
      <Link href={"/"}>
        <button className="mt-6 rounded-lg block w-full p-4 bg-secondary text-white">
          Home
        </button>
      </Link>
    </div>
  );
};

export default DisplayProfile;