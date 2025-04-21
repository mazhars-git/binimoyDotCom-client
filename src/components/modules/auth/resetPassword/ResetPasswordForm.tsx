"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { resetPasswordSchema } from "./resetPasswordValidation";
import { resetPassword } from "@/services/AuthService";
import { toast } from "sonner";
import Logo from "@/assets/Logo-adol-removebg-preview.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
  email: string;
  token: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  token,
  email,
}) => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const modifiedData = {
      ...data,
      email: email,
    };
    try {
      const res = await resetPassword(token, modifiedData);

      if (res?.success) {
        toast.success(res?.message);
        router.push("/login");
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="border-1 border-gray-300 bg-slate-50 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center justify-center">
        <Image src={Logo} alt="Adol Bodol Logo" width={130} height={10} />
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[#333]">Reset Password</h1>
        <h4 className="text-[13px] font-md text-[#333]">
          Please enter your new password below. Your password must be at least 6
          characters long and contain at least one uppercase letter, one number,
          and one special character.
        </h4>
      </div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-5 w-full">
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
