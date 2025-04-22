import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";
import { IUser } from "./types";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  user: [/^\/dashboard(?!\/admin)/, /^\/cart/, /^\/messages/, /^\/wishlist/],
  admin: [/^\/dashboard\/admin/, /^\/cart/, /^\/messages/, /^\/wishlist/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = (await getCurrentUser()) as IUser;

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `${process.env.NEXT_PUBLIC_CLIENT_BASE_API}/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/cart",
    "/wishlist",
    "/dashboard",
    "/dashboard/:page",
    "/dashboard/profile",
    "/dashboard/profile/change-password",
    "/dashboard/profile/change-status",
    "/dashboard/listing",
    "/dashboard/listing/:page",
    "/dashboard/sales-history",
    "/dashboard/purchase-history",
    "/messages",
    "/messages/:page",
    "/dashboard/admin",
    "/dashboard/admin/profile",
    "/dashboard/admin/profile/change-password",
    "/dashboard/admin/profile/change-status",
    "/dashboard/admin/:page",
    "/dashboard/admin/user-management",
    "/dashboard/admin/user-management/:page",
    "/dashboard/admin/listings",
    "/dashboard/admin/listings/:page",
  ],
};
