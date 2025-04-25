
import { IProduct } from "./product";
import { IUserDeatails } from "./user";
export interface IWishlist {
  _id: string;
  userId: IUserDeatails;
  productId: IProduct;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
