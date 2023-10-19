import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart(state, actions) {
      //find if exist
      const item = state.find(
        (item) => item.product._id === actions.payload._id
      );
      if (item) {
        item.quantity++;
      } else {
        state.push({
          product: actions.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, actions) {
      const item = state.find(
        (item) => item.product._id === actions.payload
      );

      if (item.quantity >= 1) {
        item.quantity--;
      }
      if (item.quantity === 0) {
        const index = state.findIndex(
          (item) => item.product._id === actions.payload
        );
        state.splice(index, 1);
        //   state = state.filter(
        //     (prod) => prod.product._id !== actions.payload
        //   );
      }
    },
    clearCart(state) {
      state.splice(0, state.length);
    },
  },
});
export const { addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
