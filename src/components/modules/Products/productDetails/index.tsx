"use client";
import { Button } from "@/components/ui/button";
import { addProduct } from "@/redux/features/cartSlice";
import { useAppDispatch } from "@/redux/hook";
import { IProduct } from "@/types";
import Image from "next/image";

const ProductDetails = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IProduct) => {
    dispatch(addProduct(product));
  };
  return (
    <div className="border-2 grid grid-cols-2 border-sky-300 rounded-2xl items-center my-10 gap-8 w-2xl mx-auto">
      <div>
        <Image
          src={product?.images[0]}
          width={300}
          height={50}
          alt="product image"
          className="rounded-md"
        />
      </div>

      <div className="bg-white rounded-md p-4 text-center">
        <h2 className="font-bold text-xl mb-3">{product?.title}</h2>
        <p className="text-gray-500 font-bold pb-5">Price: {product?.price}</p>
        <Button
          disabled={product?.status === "sold" ? true : false}
          onClick={() => handleAddProduct(product)}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
