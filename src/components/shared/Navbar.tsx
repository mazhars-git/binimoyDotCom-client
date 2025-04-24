"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { Heart, LogOut, ShoppingBag } from "lucide-react";
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
import Image from "next/image";
import Logo from "@/assets/Logo-adol-removebg-preview.png";

export default function Navbar() {
  const { user, userDetail, setIsLoading, refreshUser } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = async () => {
    logout();
    setIsLoading(true);
    await refreshUser();
    if (protectedRoutes.some((route: any) => pathname.match(route))) {
      router.push("/");
    }
  };

  return (
    <header className="border-b bg-background w-full sticky top-0 z-10">
      <div className="container flex justify-between items-center mx-auto h-16 px-5">
        <Link href="/">
          <Image src={Logo} width={100} height={10} alt="Logo" />
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>
          <Link href="/products" className="hover:text-orange-500">
            Products
          </Link>
          <Link href="/blog" className="hover:text-orange-500">
            Blog
          </Link>
          <Link href="/about" className="hover:text-orange-500">
            About us
          </Link>
          <Link href="/contact" className="hover:text-orange-500">
            Contact us
          </Link>
        </nav>

        <nav className="flex items-center gap-2">
          {user?.email ? (
            <>
              <div className="flex gap-4">
                <Link href="/wishlist">
                  <span className="cursor-pointer hover:text-orange-500">
                    <Heart />
                  </span>
                </Link>
                <Link href="/cart">
                  <span className="cursor-pointer hover:text-orange-500">
                    <ShoppingBag />
                  </span>
                </Link>
              </div>
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
                  <DropdownMenuSeparator className="mt-3" />
                  <Link
                    href={`${
                      user?.role === "admin"
                        ? "/dashboard/admin/profile"
                        : "/dashboard/profile"
                    }`}
                  >
                    <DropdownMenuItem className="hover:text-orange-400">
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link
                    href={`${
                      user?.role === "admin" ? "/dashboard/admin" : "/dashboard"
                    }`}
                  >
                    <DropdownMenuItem className="hover:text-orange-400">
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="bg-red-400 dark:text-black cursor-pointer dark:hover:text-white"
                    onClick={handleLogOut}
                  >
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
