const protectedRoutesConfig = {
  "/login": [],
  "/dashboard": [
    "",
    ":page",
    "profile",
    "listing",
    "listing/:page",
    "sales-history/:page",
  ],
  "/messages": [],
  "/dashboard/admin": [
    "",
    ":page",
    "user-management",
    "user-management/:page",
    "listings",
    "listings/:page",
  ],
};

const protectedRoutes = Object.keys(protectedRoutesConfig).reduce(
  (acc, basePath) => {
    const subRoutes = protectedRoutesConfig[basePath];
    if (subRoutes.length === 0) {
      acc.push(basePath);
    } else {
      subRoutes.forEach((subRoute) => {
        acc.push(`${basePath}${subRoute === "" ? "" : `/${subRoute}`}`);
      });
    }
    return acc;
  },
  []
);

console.log(protectedRoutes);
// Output:
// [
//   '/login',
//   '/dashboard',
//   '/dashboard/:page',
//   '/dashboard/profile',
//   '/dashboard/listing',
//   '/dashboard/listing/:page',
//   '/dashboard/sales-history/:page',
//   '/messages',
//   '/dashboard/admin',
//   '/dashboard/admin/:page',
//   '/dashboard/admin/user-management',
//   '/dashboard/admin/user-management/:page',
//   '/dashboard/admin/listings',
//   '/dashboard/admin/listings/:page'
// ]
