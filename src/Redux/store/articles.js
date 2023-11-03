import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../store/apiSlice";
import supabase from "../../config/supabaseClient";

const articlesAdapter = createEntityAdapter();
const initialState = articlesAdapter.getInitialState();

export const articlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from("articles").select("*");
        return { data };
      },
    }),
    getOneArticle: builder.query({
      queryFn: async (title) => {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("title", title);
        if (error) {
          return { error };
        }
        return { data };
      },
    }),
    getNextArticle: builder.query({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("id", id);
        if (error) {
          return { error };
        }
        return { data };
      },
    }),
    getPrevArticle: builder.query({
      queryFn: async (id) => {
        const { data, error } = await supabase
          .from("articles")
          .select("*")
          .eq("id", id);
        if (error) {
          return { error };
        }
        return { data };
      },
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetOneArticleQuery,
  useGetNextArticleQuery,
  useGetPrevArticleQuery,
} = articlesApiSlice;
