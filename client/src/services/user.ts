import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store/store";

export interface User {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse {
  result: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/user",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<UserResponse, RegisterRequest>({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
    }),
    auth: builder.query<UserResponse, {}>({
      query: () => ({
        url: "auth",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useAuthQuery } = api;
