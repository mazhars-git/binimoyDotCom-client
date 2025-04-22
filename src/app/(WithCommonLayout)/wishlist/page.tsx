import ManageWishlist from "@/components/modules/wishlist";
import { getCurrentUserDetails } from "@/services/AuthService";
import { getAllWishlist } from "@/services/wishlist";

const WishlistPage = async () => {
  const UserData = await getCurrentUserDetails();

  const { data } = await getAllWishlist(UserData?.data?._id);
  console.log(data);

  return (
    <div className="mx-5">
      <ManageWishlist products={data?.items} />
    </div>
  );
};

export default WishlistPage;
