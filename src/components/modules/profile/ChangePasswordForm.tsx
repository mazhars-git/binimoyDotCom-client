"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { changePassword } from "@/services/Profile";
import { logout } from "@/services/AuthService";
import { useRouter } from "next/navigation";

// Define the form validation schema using Zod
const userSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
});
// Type for the form data
type UserFormData = z.infer<typeof userSchema>;

export const UserProfileForm = () => {
  const router = useRouter();
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Handle form submission
  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      const res = await changePassword(data);

      if (res.success) {
        toast.success(res.message);
        form.reset();
        logout();
        router.push("/login");
      }
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Old Password */}
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* New Password */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password*</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      {...field}
                      className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;
