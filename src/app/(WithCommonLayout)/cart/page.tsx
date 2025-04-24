import BuyerAddress from "@/components/modules/cart/BuyerAddress";
import Cart from "@/components/modules/cart/Cart";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import RUContainer from "@/components/ui/core/RUContainer";

const CartPage = () => {
  return (
    <RUContainer>
      <div className="text-center p-10">
        <h1>Home - Cart</h1>
      </div>
      <div className="grid grid-cols-12 gap-7">
        <Cart />
        <BuyerAddress />
        <PaymentDetails />
      </div>
    </RUContainer>
  );
};
export default CartPage;
