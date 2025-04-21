"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addProductListings } from "@/services/Product";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { SubmitHandler, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { imageUpload } from "@/lib/imageUpload";
import Image from "next/image";
import { Upload } from "lucide-react";
import axios from "axios";

// Define the form validation schema using zod

const productSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  price: z.number().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  quantity: z.number().min(1, "Quantity is required"),
  status: z.string().min(1, "Status is required"),
  condition: z.string().min(1, "Condition is required"),
  location: z.string().min(1, "Location is required"),
});

// Type for the form data
type ProductFormData = z.infer<typeof productSchema>;

export default function AddListingForm() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: ""
      price: 0,
      category: "",
      images: [],
      quantity: 0,
      status: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

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

    // Create a fresh AbortController for this request
    const controller = new AbortController();
    const signal = controller.signal;

    // Toast step
    const toastId = toast.loading("Uploading image...");

    // Set a timeout to cancel the request if it takes too long (60s)
    const timeoutId = setTimeout(() => {
      controller.abort();
      toast.error("Upload took too long. You can add an image later.", {
        id: toastId,
      });
    }, 60000);

    try {
      // Upload image with timeout handling
      const image_data = await imageUpload(file, { signal });

      if (image_data?.success) {
        const imageUrl = image_data.data.display_url;
        form.setValue("images", [imageUrl]);
        // images.push(imageUrl);
        setPreviewImage(imageUrl);
        toast.success("Image uploaded successfully!", { id: toastId });
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error: any) {
      if (axios.isCancel(error)) {
        toast.error(
          "Image upload was cancelled. Upload took too long. You can add an image later.",
          { id: toastId }
        );
      } else {
        toast.error(error.message || "Image upload error, please try again.");
      }

      // Reset image field so user can retry
      form.setValue("images", []);
      setPreviewImage(null);
    } finally {
      clearTimeout(timeoutId); // Ensure timeout is cleared
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("form data", data);
    //imgbb

    const modifiedData = {
      ...data,
      price: parseFloat(data.price),
      status: data.status.toString(),
      title: data.title,
      description: data.description,
      condition: data.condition,
      category: data.category,
      quantity: parseInt(data.quantity),
      location: data.location,
      images: data.images, // Ensure images are included
    };
    try {
      const res = await addProductListings(modifiedData);
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/listing");
      } else {
        toast.error(res.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="border-2 border-slate-300 rounded-xl flex-grow max-w-2xl p-5">
      <div className="flex items-center justify-between space-x-4 mb-5">
        <h1 className="text-3xl font-bold">Adol Bodol</h1>
        <h1 className="text-3xl font-bold">List Product</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Basic Information</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="ml-2">
                  <FormLabel>Price*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter price"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : parseFloat(value));
                      }}
                      value={field.value === 0 ? "" : field.value}
                      className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="ml-2">
                  <FormLabel>Quantity*</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter price"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : parseFloat(value));
                      }}
                      value={field.value === 0 ? "" : field.value}
                      className="dark:bg-slate-200 placeholder:dark:text-slate-400 dark:text-slate-900 font-medium"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-36 resize-none"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            {/* Image Upload with Preview */}
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem className="ml-2">
                  <FormLabel>Product Image</FormLabel>
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
                            alt="Product preview"
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
                            Click to upload product image
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
          </div>

          <Button
            type="submit"
            className="mt-5 w-full"
            disabled={!isSubmitting}
          >
            {isSubmitting ? "Listing Product....." : "List Product"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
