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
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Logo from "@/assets/Logo-adol-removebg-preview.png";
import Image from "next/image";
import { CardFooter } from "@/components/ui/card";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false);
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const { setIsLoading, refreshUser } = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data);
      await refreshUser();
      setIsLoading(true);
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
    <div className="border-1 bg-slate-50 dark:bg-slate-800 border-gray-400 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center justify-center">
        <Image src={Logo} alt="Adol Bodol Logo" width={130} height={10} />
      </div>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-center ">Register</h1>
        <h1 className="text-center text-[13px] font-md ">
          Join Adol Bodol to access exclusive Gadget items!
        </h1>
      </div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    className="dark:bg-slate-50 dark:text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    value={field.value || ""}
                    className="dark:bg-slate-50 dark:text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    className="dark:bg-slate-50 dark:text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPass ? "text" : "password"}
                      {...field}
                      value={field.value || ""}
                      className="dark:bg-slate-50 dark:text-black"
                    />
                    <div
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-black">
                      {showPass ? <EyeIcon /> : <EyeClosed />}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    value={field.value || ""}
                    className="dark:bg-slate-50 dark:text-black"
                  />
                </FormControl>
                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> Password does not match </FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <Button
            disabled={Boolean(passwordConfirm && password !== passwordConfirm)}
            type="submit"
            className="mt-5 w-full dark:text-white">
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </Form>
      <CardFooter className="flex justify-center items-center gap-1 text-center">
        <p className="text-sm  font-medium">Already have an account?</p>
        <Link
          href="/login"
          className="text-sm font-semibold text-[#D8A7B1] hover:text-red-400 hover:underline">
          Login
        </Link>
      </CardFooter>
    </div>
  );
};

export default RegisterForm;
