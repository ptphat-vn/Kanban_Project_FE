import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email không được bỏ trống")
    .email("Email không hợp lệ"),
  password: z
    .string()
    .min(1, "Password không được bỏ trống")
    .min(6, "Password phải có tối thiểu 6 kí tự"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  fullname: z.string().min(1, "Fullname không được bỏ trống"),
  email: z
    .string()
    .min(1, "Email không được bỏ trống")
    .email("Email không hợp lệ"),
  phone: z
    .string()
    .trim()
    .min(1, "Số điện thoại không được bỏ trống")
    .length(10, "Số điện thoại phải đúng 10 số")
    .regex(/^\d+$/, "Số điện thoại phải là kí tự số"),
  password: z
    .string()
    .min(1, "Password không được bỏ trống")
    .min(6, "Password phải có tối thiểu 6 kí tự"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
