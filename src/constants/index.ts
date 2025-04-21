export const protectedRoutes = [
  "/login",
  "/cart",
  "/dashboard",
  "/dashboard/:page",
  "/dashboard/profile",
  "/dashboard/listing",
  "/dashboard/listing/:page",
  "/dashboard/sales-history",
  "/dashboard/purchase-history",
  "/messages",
  "/messages/:page",
  "/dashboard/admin",
  "/dashboard/admin/:page",
  "/dashboard/admin/user-management",
  "/dashboard/admin/user-management/:page",
  "/dashboard/admin/listings",
  "/dashboard/admin/listings/:page",
];


export type userRoles = 'user' | 'admin' | 'superAdmin';
