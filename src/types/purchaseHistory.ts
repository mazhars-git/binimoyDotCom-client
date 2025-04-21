import { TProduct } from "./product";
import { IUser } from "./user";

export type TTransaction = {
  _id: string;
  buyerId: IUser;
  sellerId: IUser;
  product: TProduct;
  status: "pending" | "completed";
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
    payment_status: string;
  };
  createdAt: string;
};
