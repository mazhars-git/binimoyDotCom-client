export type Condition = "new" | "like new" | "used" | "for parts";
// export type Category =
//   | "Electronics"
//   | "Furniture"
//   | "Clothing & Accessories"
//   | "Books & Magazines"
//   | "Vehicles"
//   | "Home Appliances"
//   | "Sports & Outdoors"
//   | "Toys & Games"
//   | "Beauty & Personal Care"
//   | "Tools & Hardware"
//   | "Collectibles & Art"
//   | "Pet Supplies"
//   | "Musical Instruments"
//   | "Office Supplies & Stationery"
//   | "Mobile Phones & Accessories"
//   | "Computers & Laptops"
//   | "Gaming Consoles & Accessories"
//   | "Cameras & Photography"
//   | "Baby Products"
//   | "Jewelry & Watches"
//   | "Garden & Outdoor"
//   | "Kitchenware & Dining"
//   | "Health & Wellness"
//   | "Car Accessories & Parts"
//   | "Real Estate"
//   | "Bicycles & Accessories"
//   | "Tickets & Vouchers"
//   | "Handmade & Crafts"
//   | "Antiques"
//   | "Industrial Equipment"
//   | "Farming Tools & Machinery"
//   | "Services"
//   | "Other";
export const categories = [
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
] as const;

export type Category = (typeof categories)[number];

// Define condition and status types for better semantics and control
export type Status = "available" | "sold";

export type TProduct = {
  _id: string;
  title: string;
  description: string;
  price: number;
  condition: Condition;
  category: Category;
  quantity: number;
  status: Status;
  userID: {
    _id: string;
    name: string;
    phoneNumber: string;
    email: string;
    role: "user" | "admin";
    isBlocked: boolean;
  };
  location: string;
  images: string[];
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price: number;
  // condition: string;
  condition: Condition;
  quantity: number;
  // category: string;
  category: Category;
  images: string[];
  location: string;
  // status: string;
  status: Status;
  createdAt?: string;
  updatedAt?: string;
}
