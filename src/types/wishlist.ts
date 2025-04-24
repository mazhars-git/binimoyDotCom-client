import { TProduct } from "./product";
import { IUserDeatails } from "./user";

export interface IWishlist {
  _id: string;
  userId: IUserDeatails;
  productId: TProduct;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
