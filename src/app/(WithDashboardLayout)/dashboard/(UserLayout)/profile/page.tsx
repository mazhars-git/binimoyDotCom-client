import UserProfileForm from "@/components/modules/profile/UserProfileForm";
import { getCurrentUserDetails } from "@/services/AuthService";
import { Metadata } from "next";

//metadata
export const metadata: Metadata = {
  title: "Your Profile | AdolBodol",
  description:
    "View and manage your personal information, account settings, and activity on AdolBodol — your trusted platform for buying and selling second-hand items.",
};

const UserProfile = async () => {
  const currentUser = await getCurrentUserDetails();

  return (
    <div className="flex justify-center items-center">
      <UserProfileForm user={currentUser?.data} />
    </div>
  );
};

export default UserProfile;
