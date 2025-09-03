// RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { APIResponse, AuthResponse } from "../../types/response.type";
interface LoginRequest {
  email: string;
  password: string;
}
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<APIResponse<AuthResponse>, LoginRequest>({
      //mutation: hành động để hệ thống gửi dữ liệu cho BE
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useLoginMutation } = baseApi;
