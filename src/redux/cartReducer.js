import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.item.id);

      if (item) {
        item.quantity += action.payload.item.quantity;
      } else {
        state.products.push(action.payload.item);
      }
    },
    increaseQty: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQty: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        }
      }
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart, increaseQty, decreaseQty } =
  cartSlice.actions;

export default cartSlice.reducer;
