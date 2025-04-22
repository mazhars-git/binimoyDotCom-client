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
import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IUserDeatails } from "@/types";
import { imageUpload } from "@/lib/imageUpload";
import Image from "next/image";
import { updateUserProfile } from "@/services/Profile";

// Define the form validation schema using Zod
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .regex(/^01\d{9}$/, "Phone number must be 11 digits and start with 01"),
  photo: z.string().optional(),
});

// Type for the form data
type UserFormData = z.infer<typeof userSchema>;

// user profile interface
interface UserProfileProps {
  user: IUserDeatails;
}

export const UserProfileForm: React.FC<UserProfileProps> = ({ user }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(user?.photo);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    defaultValues: {
      name: user?.name || "",
      photo: user?.photo || "",
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Set initial form values when user data is fetched
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        photo: user.photo,
        phoneNumber: user.phoneNumber,
      });
      setPreviewImage(user.photo);
    }
  }, [user, form]);

  // Handle file change for image upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.includes("image")) {
      toast.error("Please upload an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    // Upload the image to ImgBB
    try {
      const image_data = await imageUpload(file);

      if (image_data.success) {
        const imageUrl = image_data.data.display_url;
        form.setValue("photo", imageUrl);
        setPreviewImage(imageUrl);
        toast.success("Image uploaded to ImgBB successfully!");
      } else {
        toast.error("Image upload failed, please try again.");
      }
    } catch (error) {
      toast.error("Image upload error, please try again.");
    }
  };

  // Handle form submission
  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      if (user?._id) {
        // Update profile
        const res = await updateUserProfile(data, user?._id);
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Profile Photo */}
            <FormField
              control={form.control}
              name="photo"
              render={() => (
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <div className="flex flex-col gap-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                      {previewImage ? (
                        <div className="w-full">
                          <Image
                            src={previewImage}
                            width={200}
                            height={200}
                            alt="Profile preview"
                            className="mx-auto max-h-48 object-contain"
                          />
                          <p className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Click to change image
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Click to upload profile photo
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            PNG, JPG, GIF up to 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name*</FormLabel>
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

              {/* phone number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Phone Number*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone number"
                        {...field}
                        className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4 mt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;
