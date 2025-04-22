"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { Heart, LogOut, MessageCircle, ShoppingBag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/constants";
import { ModeToggle } from "../ui/mode-toggle";

export default function Navbar() {
  const { user, userDetail, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route: any) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b bg-background w-full sticky top-0 z-10">
      <div className="container flex justify-between items-center mx-auto h-16 px-5">
        <Link href="/">
          <h1 className="text-2xl font-black flex items-center">AdolBodol</h1>
        </Link>

        <nav className="flex justify-center items-center gap-2">
          {user?.email ? (
            <>
              <Link href="/wishlist">
                <Heart />
              </Link>
              <Link href="/cart">
                <ShoppingBag />
              </Link>
              <Link href="/messages">
                <MessageCircle />
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={userDetail?.photo || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <p className="pl-2 text-sm font-semibold">
                    {userDetail?.name}
                  </p>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      href={`${
                        user?.role === "admin"
                          ? "/dashboard/admin/profile"
                          : "/dashboard/profile"
                      }`}>
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href={`${
                        user?.role === "admin"
                          ? "/dashboard/admin"
                          : "/dashboard"
                      }`}>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-100 cursor-pointer"
                    onClick={handleLogOut}>
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button className="rounded-full" variant="outline">
                Login
              </Button>
            </Link>
          )}

          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
