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
import type { Board, BoardListResponse } from "@/types/board.type";
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

interface CreateBoardRequest {
  title: string;
  description?: string;
  color: string;
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
  tagTypes: ["User", "Board"],
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
    getBoards: builder.query<
      APIResponse<BoardListResponse>,
      { page?: number; limit?: number; search?: string }
    >({
      query: (params = { page: 1, limit: 10, search: "" }) => {
        const { page, limit, search } = params;
        return `/boards?page=${page}&limit=${limit}&search=${search}`;
      },
      providesTags: [{ type: "Board", id: "LIST" }], //lấy danh sách board, id đặt gì cx đc
      //dựa vào tag này nó sẽ không gọi lại API, nếu mà dữ liệu thay đổi mới gọi lại API
    }),
    createBoards: builder.mutation<APIResponse<Board>, CreateBoardRequest>({
      query: (boardData) => ({
        url: "/boards",
        method: "POST",
        body: boardData,
      }),
      invalidatesTags: [{ type: "Board", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useRegisterMutation,
  useGetBoardsQuery,
  useCreateBoardsMutation,
} = baseApi;
