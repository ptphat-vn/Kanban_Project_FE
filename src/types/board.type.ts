export interface Board {
  id: number;
  title: string;
  description: string;
  color: string;
  isPublic: true;
  ownerId: number;
  createAt: string;
  updateAt: string;
  owner: {
    id: number;
    name: string;
    email: string;
  };
  _count: {
    lists: number;
    members: number;
  };
}

export interface BoardListResponse {
  boards: Board[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: number;
    hasPreviousPage: number;
  };
}
