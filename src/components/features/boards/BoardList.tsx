import BoardItems from "./BoardItems";
import {
  useCreateBoardsMutation,
  useGetBoardsQuery,
} from "@/store/api/boardApi";
import CreateBoardPopover from "./CreateBoardPopover";
import { toast } from "sonner";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

export default function BoardList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isLoading, error } = useGetBoardsQuery({
    page: currentPage,
    limit: 8,
    search: "",
  });
  const boards = data?.data?.boards || [];
  // console.log(boards);
  const [createBoard] = useCreateBoardsMutation();

  const pagination = data?.data.pagination;
  const totalPages = pagination?.totalPages || 1;

  const handleCreateBoard = async (boardData: {
    title: string;
    color: string;
  }) => {
    console.log(boardData);

    try {
      await createBoard({
        title: boardData.title,
        color: boardData.color,
      }).unwrap();
      toast.success("Tạo mới Board thành công!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  if (isLoading) {
    return (
      <div className="flex item-center justify-center h-64">
        <div className="text-gray-500">Loading boards...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex item-center justify-center h-64">
        <div className="text-red-500">Error loading boards</div>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {boards.map((board) => (
          <BoardItems
            key={board.id}
            title={board.title}
            id={board.id}
            color={board.color}
          />
        ))}
        <CreateBoardPopover onSubmit={handleCreateBoard}>
          <div
            className="group cursor-pointer transition-all duration-200 hover:scale-105"
            typeof="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-«r2»"
            data-state="closed"
            data-slot="popover-trigger"
          >
            <div className="h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-gray-400 transition-colors">
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 24, height: 24, cursor: "default" }}
                  >
                    <svg
                      className="inline-block w-6 h-6 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-gray-700 font-medium text-sm">
                  Create new board
                </h3>
              </div>
            </div>
          </div>
        </CreateBoardPopover>
      </div>
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                onClick={() => setCurrentPage(Math.max(currentPage - 1))}
              />
            </PaginationItem>

            <PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationLink
                    isActive={currentPage === page}
                    key={page}
                    href="#"
                    onClick={() => handleChangePage(page)}
                  >
                    {page}
                  </PaginationLink>
                )
                //Array.from là từ độ dài của totalPages đổi thành mảng
              )}
            </PaginationItem>

            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}

            <PaginationItem>
              <PaginationNext
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                onClick={() => setCurrentPage(Math.min(currentPage + 1))}
                href="#"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
