import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../store/apiSlice";
import supabase from "../../config/supabaseClient";

const commentsAdapter = createEntityAdapter();
const initialState = commentsAdapter.getInitialState();

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductComments: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from("comments").select("*");
        return { data };
      },
    }),
    getOneComment: builder.query({
      queryFn: async (productID) => {
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("productID", productID);
        if (error) {
          return { error };
        }
        return { data };
      },
    }),
    addToComments: builder.mutation({
      queryFn: async (comment) => {
        const { data, error } = await supabase.from("comments").insert(comment);
        if (error) {
          return { error };
        }
        return { data };
      },
    }),
  }),
});

export const {
  useGetProductCommentsQuery,
  useGetOneCommentQuery,
  useAddToCommentsMutation,
} = commentsApiSlice;
