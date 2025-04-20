export interface IProduct {
  _id?: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  quantity: number;
  category: string;
  images: string[];
  location: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}
