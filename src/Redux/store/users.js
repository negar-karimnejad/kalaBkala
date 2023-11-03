import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import supabase from "../../config/supabaseClient";

const shoppingCartAdaptor = createEntityAdapter();
const initialState = shoppingCartAdaptor.getInitialState();

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      queryFn: async ({ fullname, phone, email, password }) => {
        const { data, error } = await supabase.auth.signUp({
          id: new Date().getTime(),
          email,
          password,
          options: {
            data: {
              fullname,
              phone,
            },
          },
        });
        if (error) {
          throw new Error(error.message);
        }
        return data;
      },
      invalidatesTags: ["User"],
    }),
    signInUser: builder.mutation({
      queryFn: async ({ email, password }) => {
        let { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          throw new Error(error.message);
        }
        return { data };
      },
      invalidatesTags: ["User"],
    }),
    signOutUser: builder.mutation({
      queryFn: async () => {
        const { data, error } = await supabase.auth.signOut();
        if (error) {
          return { error };
        }
        return { data };
      },
      invalidatesTags: ["User"],
    }),
    getUser: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          return { error };
        }
        return { data };
      },
      providesTags: ["User"],
    }),
    changeUser: builder.mutation({
      queryFn: async ({ email, fullname, newPassword, phone }) => {
        const { data, error } = await supabase.auth.updateUser({
          fullname,
          phone,
          password: newPassword,
          email,
        });
        if (error) {
          return { error };
        }
        return { data };
      },
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useSignInUserMutation,
  useSignOutUserMutation,
  useGetUserQuery,
  useChangeUserMutation,
} = usersApiSlice;
