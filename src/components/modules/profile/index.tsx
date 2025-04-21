"use client";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { updateSingleUser } from "@/services/Profile";
import { IUser } from "@/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SquarePen } from "lucide-react";

export const userRoles = ["Admin", "User", "Moderator"] as const;
export type UserRole = (typeof userRoles)[number];

export default function UserProfileForm({ user }: { user: IUser }) {
  const [enableEdit, setEnableEdit] = useState(false);

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      // email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      // role: user?.role || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const handleEnableEdit = () => setEnableEdit(true);

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   setEnableEdit(false);
  //   try {
  //     const result = await updateSingleUser(user?.userId, data);
  //     if (result?.success) {
  //       console.log("from ", result.message);
  //       toast.success(result?.message);
  //     } else {
  //       console.log(result.message);
  //       toast.error(result?.message);
  //     }
  //   } catch (error) {
  //     toast.error(String(error));
  //   }
  // };


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setEnableEdit(false);
    try {
      if (!user?.userId) {
        toast.error("User ID is missing");
        return;
      }
  
      toast.promise(
        updateSingleUser(user.userId, data),
        {
          loading: 'Updating profile...',
          success: (result) => {
            if (result.success) {
              return result.message || "Profile updated successfully";
            } else {
              throw new Error(result.message);
            }
          },
          error: (err) => err.message || "Update failed"
        }
      );
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(error.message || "An error occurred");
    }
  };
  return (
    <div className="border rounded-2xl shadow-md p-6 w-full max-w-3xl bg-white">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <h2 className="text-2xl font-semibold text-primary">
              Account Details
            </h2>
            <Button
              onClick={handleEnableEdit}
              disabled={enableEdit}
              type="button"
              variant="secondary"
              className="gap-2"
            >
              Edit <SquarePen size={16} />
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={!enableEdit} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" disabled={!enableEdit} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} */}
            {/* /> */}

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input disabled={!enableEdit} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userRoles.map((role, idx) => (
                        <SelectItem key={idx} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <div className="flex justify-end mt-8">
            <Button type="submit" disabled={!enableEdit || isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
