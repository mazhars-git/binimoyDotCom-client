"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { IProduct, categories } from "@/types";

const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().min(0),
  quantity: z.number().min(0),
  condition: z.enum(["new", "like new", "used", "for parts"]),
  category: z.enum([
    "Electronics",
    "Furniture",
    "Clothing & Accessories",
    "Books & Magazines",
    "Vehicles",
    "Home Appliances",
    "Sports & Outdoors",
    "Toys & Games",
    "Beauty & Personal Care",
    "Tools & Hardware",
    "Collectibles & Art",
    "Pet Supplies",
    "Musical Instruments",
    "Office Supplies & Stationery",
    "Mobile Phones & Accessories",
    "Computers & Laptops",
    "Gaming Consoles & Accessories",
    "Cameras & Photography",
    "Baby Products",
    "Jewelry & Watches",
    "Garden & Outdoor",
    "Kitchenware & Dining",
    "Health & Wellness",
    "Car Accessories & Parts",
    "Real Estate",
    "Bicycles & Accessories",
    "Tickets & Vouchers",
    "Handmade & Crafts",
    "Antiques",
    "Industrial Equipment",
    "Farming Tools & Machinery",
    "Services",
    "Other",
  ]),
  images: z.array(z.string().url()).min(1),
  location: z.string(),
  status: z.enum(["available", "sold"]),
});

type ProductFormData = z.infer<typeof productSchema>;

type Props = {
  defaultValues: IProduct;
  onSubmit: (data: ProductFormData) => void;
};

export default function UpdateProductForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("title")} placeholder="Title" />
      {errors.title && <p>{errors.title.message}</p>}

      <textarea {...register("description")} placeholder="Description" />
      {errors.description && <p>{errors.description.message}</p>}

      <input
        type="number"
        {...register("price", { valueAsNumber: true })}
        placeholder="Price"
      />
      {errors.price && <p>{errors.price.message}</p>}

      <input
        type="number"
        {...register("quantity", { valueAsNumber: true })}
        placeholder="Quantity"
      />
      {errors.quantity && <p>{errors.quantity.message}</p>}

      <select {...register("condition")}>
        {["new", "like new", "used", "for parts"].map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>

      {/* <select {...register("category")}>
        {Object.values(Category).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select> */}

      <select {...register("category")}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input {...register("location")} placeholder="Location" />
      {errors.location && <p>{errors.location.message}</p>}

      <select {...register("status")}>
        {["available", "sold"].map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>

      <input {...register("images.0")} placeholder="Image URL 1" />
      {errors.images && <p>{errors.images.message}</p>}

      <button type="submit">Update Product</button>
    </form>
  );
}
