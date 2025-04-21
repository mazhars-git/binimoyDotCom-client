import UserProfileForm from "@/components/modules/profile";
import { getCurrentUser, getCurrentUserDetails } from "@/services/AuthService";
import { getSingleUser } from "@/services/Profile";

import { IUser } from "@/types";
import { Metadata } from "next";

//metadata
export const metadata: Metadata = {
  title: "SeccondMart | Profile",
  description: "This is Profile page of seccond mart project",
};



const UserProfile = async () => {
  const existUser = await getCurrentUser() as IUser;
  // console.log(existUser.userId);

  const { data: userProfile } = await getSingleUser(
    existUser.email
  );

  // console.log(userProfile)

  return (
    <div className="flex justify-center items-center">
      <UserProfileForm user={existUser} />
    </div>
  );
};

export default UserProfile;