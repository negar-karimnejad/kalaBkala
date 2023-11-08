import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const mobileMenuAdaptor = createEntityAdapter();
const initialState = mobileMenuAdaptor.getInitialState();

export const mobileMenuApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({}),
});

const mobileMenuSlice = createSlice({
  name: "mobileMenu",
  initialState: {
    ...initialState,
    is_Show: false,
  },
  reducers: {
    setIsShow: (state, action) => {
      state.is_Show = action.payload;
    },
  },
});

export const { setIsShow } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
