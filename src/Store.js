import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cart-slice";
import adminSlice from "./features/admin-slice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    admin: adminSlice,
  },
});

export default store;
