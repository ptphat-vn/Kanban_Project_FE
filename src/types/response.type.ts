export interface APIResponse<T> {
  success: string;
  message: string;
  data: T;
}

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: number;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
  accessToken: string;
  refreshToken: string;
}
