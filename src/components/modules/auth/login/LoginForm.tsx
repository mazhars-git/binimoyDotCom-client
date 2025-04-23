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
import { loginSchema } from "./loginValidation";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Logo from "@/assets/Logo-adol-removebg-preview.png";
import Image from "next/image";
import { CardFooter } from "@/components/ui/card";
import { useRef } from "react";
import { EyeClosed, EyeIcon } from "lucide-react";
import { useTheme } from "next-themes";

const LoginForm = () => {
  const { theme } = useTheme();
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { refreshUser } = useUser();

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [showPass, setShowPass] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);

      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      await refreshUser();

      if (res?.success) {
        toast.success(res?.message);
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
        setForgetPassword(res?.message);
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
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold ">Welcome Back!</h1>
        <h4 className="text-[13px] font-md">
          Login to access your Adol Bodol account.
        </h4>
      </div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
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
          <div className="flex justify-between items-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY || ""}
              onChange={handleReCaptcha}
              theme={theme === "dark" ? "dark" : "light"}
            />
            <p
              role="button"
              onClick={() => {
                setForgetPassword(null);
                setReCaptchaStatus(false);
                form.reset();
                recaptchaRef.current?.reset();
              }}
              className="text-sm font-semibold hover:underline hover:text-red-500">
              Try again
            </p>
          </div>

          <Button
            disabled={!reCaptchaStatus}
            type="submit"
            className="mt-5 w-full dark:text-white">
            {isSubmitting ? "Logging..." : "Login"}
          </Button>
        </form>
      </Form>
      <CardFooter className="flex items-center justify-center flex-col gap-1 text-center">
        <div className="pt-2">
          <p className="text-sm  font-medium">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-sm font-semibold text-[#D8A7B1] hover:text-red-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
        <div>
          {forgetPassword && (
            <div className="text-sm text-red-500 font-semibold mt-2 ">
              <p className="">{forgetPassword}</p>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-[#f19a9a]  hover:text-red-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
          )}
        </div>
      </CardFooter>
    </div>
  );
};

export default LoginForm;
