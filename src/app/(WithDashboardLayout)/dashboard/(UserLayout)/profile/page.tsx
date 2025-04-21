import UserProfileForm from "@/components/modules/profile";
import { getCurrentUser, getCurrentUserDetails } from "@/services/AuthService";
import { getSingleUser } from "@/services/Profile";

import { IUser } from "@/types";
import { Metadata } from "next";

//metadata
export const metadata: Metadata = {
  title: "Your Profile | AdolBodol",
  description: "View and manage your personal information, account settings, and activity on AdolBodol — your trusted platform for buying and selling second-hand items.",
};



const UserProfile = async () => {
  const existUser = await getCurrentUser() as IUser;

  const { data: userProfile } = await getSingleUser(
    existUser.email
  );


  return (
    <div className="flex justify-center items-center">
      <UserProfileForm user={existUser} />
    </div>
  );
};

export default UserProfile;