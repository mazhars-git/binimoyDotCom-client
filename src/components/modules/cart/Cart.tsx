import Image from "next/image";
import emptyCart from "@/assets/empty-cart.jpg";
import CartProductCard from "./CartProductCard";
import { getAllListings } from "@/services/Product";
import { IProduct } from "@/types";

export default async function Cart() {
  const { data: products } = await getAllListings();
  return (
    <div className="col-span-8 row-span-3 h-full space-y-5">
      {products.length === 0 && (
        <div className="text-center pt-5">
          <p className="text-2xl font-bold text-orange-500">Cart is empty!!</p>

          <div className="flex justify-center items-center">
            <Image src={emptyCart} alt="empty cart" width={400} height={400} />
          </div>
        </div>
      )}
      {products.map((product: IProduct) => (
        <CartProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
