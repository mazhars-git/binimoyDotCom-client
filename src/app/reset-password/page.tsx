"use client";
import ResetPasswordForm from "@/components/modules/auth/resetPassword/ResetPasswordForm";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") as string;
  const token = searchParams.get("token") as string;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <ResetPasswordForm email={email} token={token} />
    </div>
  );
};

export default ResetPasswordPage;
