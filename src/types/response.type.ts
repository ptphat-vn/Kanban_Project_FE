export interface APIResponse<T> {
  success: string;
  message: string;
  data: T;
}
