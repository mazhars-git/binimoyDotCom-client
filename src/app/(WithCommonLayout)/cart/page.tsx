import BuyerAddress from "@/components/modules/cart/BuyerAddress";
import Cart from "@/components/modules/cart/Cart";
import RUContainer from "@/components/ui/core/RUContainer";

const CartPage = () => {
  return (
    <RUContainer>
      <div className="text-center p-10 ">
        <h1 className="font-bold text-4xl text-blue-500 dark:text-orange-500">
          {" "}
          Cart Page
        </h1>
      </div>
      <div className="grid grid-cols-12 gap-7 text-center">
        <Cart />
        <BuyerAddress />
      </div>
    </RUContainer>
  );
};
export default CartPage;
