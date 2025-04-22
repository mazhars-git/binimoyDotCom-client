import ChangeStatusForm from "@/components/modules/profile/ChangeStatusForm";
import { getCurrentUserDetails } from "@/services/AuthService";
import { Metadata } from "next";

//metadata
export const metadata: Metadata = {
  title: "Account Setting | AdolBodol",
  description:
    "View and manage your personal information, account settings, and activity on AdolBodol — your trusted platform for buying and selling second-hand items.",
};

const ChangeStatusPage = async () => {
  const currentUser = await getCurrentUserDetails();

  return (
    <div className="flex justify-center items-center">
      <ChangeStatusForm user={currentUser?.data} />
    </div>
  );
};

export default ChangeStatusPage;
