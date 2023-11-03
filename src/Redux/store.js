import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Redux/store/apiSlice";
import shoppingCartReducer from "./store/ShoppingCart";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    shoppingCart: shoppingCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
