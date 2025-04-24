import { IProduct } from "./product";
import { IUserDeatails } from "./user";

export type TOrderStatus = "pending" | "completed";

export type TTransaction = {
  _id: string;
  buyerId: IUserDeatails;
  sellerId: IUserDeatails;
  product: IProduct;
  status: TOrderStatus;
  address: string;
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
};
