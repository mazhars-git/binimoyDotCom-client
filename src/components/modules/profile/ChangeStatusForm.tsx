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
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IUserDeatails } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { changeAccountStatus } from "@/services/AuthService";

// Define the form validation schema using Zod
const userSchema = z.object({
  status: z.string().min(1, "Status is required"),
});

// Type for the form data
type UserFormData = z.infer<typeof userSchema>;

// user profile interface
interface UserProfileProps {
  user: IUserDeatails;
}

export const ChangeStatusForm: React.FC<UserProfileProps> = ({ user }) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    defaultValues: {
      status: user?.status || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Set initial form values when user data is fetched
  useEffect(() => {
    if (user) {
      form.reset({
        status: user.status,
      });
    }
  }, [user, form]);

  // Handle form submission
  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      if (user?._id) {
        // Update profile
        const res = await changeAccountStatus(data, user?._id);
        if (res.success) {
          toast.success(res.message);
        }
      }
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">User Account Settings</h1>

      <h2 className="text-lg font-semibold mb-4">
        By Changing Your Status, You Can Active Or Deactive Your Account
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select your condition*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className="dark:bg-slate-200 dark:text-slate-900">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Updating..."
                : user?.status === "active"
                ? "Deactive Acccount"
                : "Active Acccount"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangeStatusForm;
