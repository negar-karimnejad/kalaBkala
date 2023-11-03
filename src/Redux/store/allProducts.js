import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import supabase from "../../config/supabaseClient";
import { BiNetworkChart } from "react-icons/bi";

const allProductsAdaptore = createEntityAdapter();
const initialState = allProductsAdaptore.getInitialState();

const allProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from("allProducts").select("*");
        if (error) {
          return error;
        }
        return { data };
      },
      providesTags: ["AllProduct"],
    }),
    getSingleProduct: builder.query({
      queryFn: async (name) => {
        const { data, error } = await supabase
          .from("allProducts")
          .select("*")
          .eq("name", name);
        if (error) {
          return error;
        }
        return { data };
      },
      providesTags: ["AllProduct"],
    }),
    getProductsCategory: builder.query({
      queryFn: async (category) => {
        const { data, error } = await supabase
          .from("allProducts")
          .select("*")
          .eq("category", category);
        if (error) {
          return error;
        }
        return { data };
      },
    }),
    minusProductCounter: builder.mutation({
      queryFn: async (product) => {
        const { data, error } = await supabase
          .from("allProducts")
          .update({ counter: product.counter - 1 })
          .eq("id", product.id);

        if (error) {
          return error;
        }
        return { data };
      },
    }),
    addProductCounter: builder.mutation({
      queryFn: async (product) => {
        const { data, error } = await supabase
          .from("allProducts")
          .update({ counter: product.counter + 1 })
          .eq("id", product.id);
        if (error) {
          return error;
        }
        return { data };
      },
    }),
    updateProductRating: builder.mutation({
      queryFn: async (product) => {
        const { newRating, productID } = product;
        const { data, error } = await supabase
          .from("allProducts")
          .update({ rating: newRating })
          .eq("id", productID);
        if (error) {
          console.log(error);
          return error;
        }
        console.log(data);
        return { data };
      },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useGetProductsCategoryQuery,
  useMinusProductCounterMutation,
  useAddProductCounterMutation,
  useUpdateProductRatingMutation,
} = allProductsApiSlice;
