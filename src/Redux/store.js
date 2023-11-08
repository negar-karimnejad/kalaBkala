import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Redux/store/apiSlice";
import shoppingCartReducer from "./store/ShoppingCart";
import mobileMenuReducer from "./store/mobileMenu";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    shoppingCart: shoppingCartReducer,
    mobileMenu: mobileMenuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
