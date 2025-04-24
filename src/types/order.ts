export interface IOrder {
  buyerID: string;
  products: {
    product: string;
    sellerID: string;
    quantity: number;
  }[];
  address: string;
}

export interface IVerifiyedOrder{
  order_id:string
}