import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import supabase from "../../config/supabaseClient";

const shoppingCartAdaptor = createEntityAdapter();
const initialState = shoppingCartAdaptor.getInitialState();

const shoppingCartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from("shoppingCart").select("*");
        if (error) {
          return { error };
        }
        return { data };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Shoppingcart",
                id,
              })),
              { type: "Shoppingcart", id: "LIST" },
            ]
          : [{ type: "Shoppingcart", id: "LIST" }],
    }),
    getUserShoppingCart: builder.query({
      queryFn: async (userID) => {
        const { data, error } = await supabase
          .from("shoppingCart")
          .select("*")
          .eq("userID", userID);
        if (error) {
          return { error };
        }
        return { data };
      },
      providesTags: ["Shoppingcart"],
    }),
    addToShoppingCart: builder.mutation({
      queryFn: async (product) => {
        const { data, error } = await supabase
          .from("shoppingCart")
          .insert(product);
        if (error) {
          return { error };
        }
        return { data };
      },
      invalidatesTags: ["Shoppingcart"],
    }),
    deleteFromShoppingCart: builder.mutation({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("shoppingCart")
          .delete()
          .eq("id", id);
        if (error) {
          return { error };
        }
        return { data };
      },
      invalidatesTags: [{ type: "Shoppingcart", id: "LIST" }],
    }),
    minusCartProductCounter: builder.mutation({
      queryFn: async (product) => {
        const { data, error } = await supabase
          .from("shoppingCart")
          .update({ counter: product.counter - 1 })
          .eq("id", product.id);

        if (error) {
          return error;
        }
        return { data };
      },
      invalidatesTags: ["Shoppingcart"],
    }),
    addCartProductCounter: builder.mutation({
      queryFn: async (product) => {
        const { data, error } = await supabase
          .from("shoppingCart")
          .update({ counter: product.counter + 1 })
          .eq("id", product.id);
        if (error) {
          return error;
        }
        return { data };
      },
      invalidatesTags: ["Shoppingcart"],
    }),
  }),
});
export const {
  useGetShoppingCartQuery,
  useAddToShoppingCartMutation,
  useDeleteFromShoppingCartMutation,
  useMinusCartProductCounterMutation,
  useAddCartProductCounterMutation,
  useGetUserShoppingCartQuery,
} = shoppingCartApiSlice;

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState: {
    ...initialState,
    is_active: false,
  },
  reducers: {
    setIsActive: (state, action) => {
      state.is_active = action.payload;
    },
  },
});

export const { setIsActive } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
