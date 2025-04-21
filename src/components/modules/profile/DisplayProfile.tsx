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
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded-2xl shadow-lg max-w-xl mx-auto mt-10 space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-2">
        <Avatar className="w-24 h-24 ring ring-primary ring-offset-2">
          <AvatarImage
            src={user?.photo || "https://github.com/shadcn.png"}
            alt={user?.name || "User"}
          />
          <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold">{user?.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user?.phoneNumber}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-center shadow">
          <p className="text-lg font-medium">{totalPurchaseProduct}</p>
          <span className="text-sm text-gray-500">Purchased</span>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-center shadow">
          <p className="text-lg font-medium">{totalSoldProduct}</p>
          <span className="text-sm text-gray-500">Sold</span>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl text-center shadow">
          <p className="text-lg font-medium">{totalProduct}</p>
          <span className="text-sm text-gray-500">Posted</span>
        </div>
      </div>

      {/* Navigation */}
      <Link href="/">
        <button className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default DisplayProfile;
