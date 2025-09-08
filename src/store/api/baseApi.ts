// RTK Query
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { APIResponse, AuthResponse } from "@/types/response.type";
import type { RootState } from "../store";
import { logout, setAuth } from "@/store/authSlice";
import type { User } from "@/types/user.type";
interface LoginRequest {
  email: string;
  password: string;
}

interface ErrorResponse {
  message?: string;
}

interface RefreshTokenResponse {
  data?: {
    accessToken: string;
    refreshToken: string;
  };
}

interface RegisterRequest {
  name: string;
  phone: string;
  email: string;
  password: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (agrs, api, extraOptions) => {
  let result = await baseQuery(agrs, api, extraOptions);
  if (result.error?.status === 401) {
    const errorData = result.error.data as ErrorResponse;
    if (errorData.message === "Access denied, token expired") {
      const refreshToken = (api.getState() as RootState).auth.refreshToken;
      if (refreshToken) {
        let refreshResult = await baseQuery(
          {
            url: "auth/refresh",
            method: "POST",
            body: {
              refreshToken,
            },
          },
          api,
          extraOptions
        );
        const newAccessToken = (refreshResult.data as RefreshTokenResponse)
          ?.data?.accessToken;
        if (newAccessToken) {
          api.dispatch(
            setAuth({
              accessToken: newAccessToken,
              refreshToken: refreshToken,
            })
          );
        }
        result = await baseQuery(agrs, api, extraOptions);
      } else {
        api.dispatch(logout());
        window.location.reload();
      }
    } else {
      api.dispatch(logout());
      window.location.reload();
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  //gọi baseQuery là customBaseQuery(agrs, api, extraOptions)
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<APIResponse<AuthResponse>, LoginRequest>({
      //mutation là biến đổi
      //mutation: hành động để hệ thống gửi dữ liệu cho BE
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
    }),
    register: builder.mutation<APIResponse<User>, RegisterRequest>({
      //mutation là biến đổi
      //mutation: hành động để hệ thống gửi dữ liệu cho BE
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    getProfile: builder.query<APIResponse<User>, void>({
      //query là lấy
      query: () => ({
        url: "/auth/me",
        cache: "no-cache",
      }),
    }),
    logout: builder.mutation<{ success: string; message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useRegisterMutation,
} = baseApi;
