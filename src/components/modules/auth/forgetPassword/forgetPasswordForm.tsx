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
import { forgetPasswordSchema } from "./forgetPasswordValidation";
import { forgetPassword } from "@/services/AuthService";
import { toast } from "sonner";
import Logo from "@/assets/Logo-adol-removebg-preview.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ForgetPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await forgetPassword(data);

      if (res?.success) {
        toast.success(res?.message);
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="border-1 border-gray-300 bg-slate-50 dark:bg-slate-800 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center justify-center">
        <Image src={Logo} alt="Adol Bodol Logo" width={130} height={10} />
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Forget Password</h1>
        <h4 className="text-[13px] font-md">
          Enter your email address and we will send you a link to reset your
          password.
        </h4>
      </div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Account Valid Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    value={field.value || ""}
                    placeholder="Enter your email"
                    className="dark:bg-slate-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-5 w-full dark:text-white">
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ForgetPasswordForm;
