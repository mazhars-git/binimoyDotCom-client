import Cart from "@/components/modules/cart/Cart";
import RUContainer from "@/components/ui/core/RUContainer";

const CartPage = () => {
  return (
    <RUContainer>
      <div className="text-center p-10">
        <h1>Home - Cart</h1>
      </div>
      <div className="grid grid-cols-12 gap-7">
        <Cart />
      </div>
    </RUContainer>
  );
};
export default CartPage;
