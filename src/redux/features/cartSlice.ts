import { IProduct } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  product: IProduct;
  address: string;
}

const initialState: InitialState = {
  product: {
    _id: "",
    title: "",
    description: "",
    price: 0,
    condition: "",
    quantity: 0,
    orderQuantity: 0,
    category: "",
    images: [],
    location: "",
    status: "available",
  },
  address: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const newProduct = action.payload;

      // Only update if it's a different product
      if (state.product._id !== newProduct._id) {
        state.product = newProduct;
      }
    },

    removeFromCart: (state) => {
      state.product = {
        _id: "",
        title: "",
        description: "",
        price: 0,
        condition: "",
        quantity: 0,
        orderQuantity: 0,
        category: "",
        images: [],
        location: "",
        status: "available",
      };
      state.address = "";
    },

    addAddress: (state, action) => {
      state.address = action.payload;
    },
  },
});

// order

export const orderedProductSelector = (state: RootState) => {
  return state.cart.product;
};

export const orderSelector = (state: RootState) => {
  return {
    product: state.cart.product._id,
    address: state.cart.address,
  };
};

// Address
export const addressSelector = (state: RootState) => {
  return state.cart.address;
};

export const { addToCart, removeFromCart, addAddress } = cartSlice.actions;
export default cartSlice.reducer;
