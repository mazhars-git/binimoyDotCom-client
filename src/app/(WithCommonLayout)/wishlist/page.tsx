// import ManageWishlist from "@/components/modules/wishlist";
// import { getCurrentUserDetails } from "@/services/AuthService";
// import { getAllWishlist } from "@/services/wishlist";

// const WishlistPage = async () => {
//   const UserData = await getCurrentUserDetails();

//   const res = await getAllWishlist(UserData?.data?._id);
//   console.log(UserData?.data);

//   if (res && res.data) {
//     return (
//       <div className="mx-5">
//         <ManageWishlist products={res.data.items || []} />
//       </div>
//     );
//   } else {
//     return <div>Failed to load wishlist items.</div>;
//   }
// };

// export default WishlistPage;

import ManageWishlist from "@/components/modules/wishlist";
import { getCurrentUserDetails } from "@/services/AuthService";
import { getAllWishlist } from "@/services/wishlist";

const WishlistPage = async () => {
  const UserData = await getCurrentUserDetails();

  const data = { items: [] };

  try {
    const res = await getAllWishlist(UserData?.data?._id);
    data.items = res?.data || [];
  } catch (error) {
    console.error("Error fetching wishlist:", error);
  }

  return (
    <div className="mx-5">
      <ManageWishlist products={data.items} />
    </div>
  );
};

export default WishlistPage;
