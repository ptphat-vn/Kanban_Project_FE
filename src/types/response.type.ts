import type { User } from "./user.type";

export interface APIResponse<T> {
  success: string;
  message: string;
  status?: number;
  data: T;
}

export interface AuthResponse extends User {
  accessToken: string;
  refreshToken: string;
}
