import type { APIResponse } from "@/types/response.type";
import { baseApi } from "./baseApi";
import type { Board, BoardListResponse } from "@/types/board.type";
interface CreateBoardRequest {
  title: string;
  description?: string;
  color: string;
}
export const boardApi = baseApi.injectEndpoints({
  //injectEndpoints: tiêm vào baseApi
  endpoints: (builder) => ({
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
    getBoardById: builder.query<APIResponse<Board>, string>({
      query: (id: string) => `/board/${id}`,
    }),
  }),
});
export const { useGetBoardsQuery, useCreateBoardsMutation } = boardApi;
