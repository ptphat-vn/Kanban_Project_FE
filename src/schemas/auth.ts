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

export const registerSchema = z
  .object({
    name: z.string().min(1, "Họ và tên không được bỏ trống"),
    email: z
      .string()
      .min(1, "Email không được bỏ trống")
      .email("Email không hợp lệ"),
    phone: z
      .string()
      .trim()
      .min(1, "Số điện thoại không được bỏ trống")
      .refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), {
        message: "Không đúng định dạng số điện thoại",
      }),
    password: z
      .string()
      .min(1, "Password không được bỏ trống")
      .min(6, "Password phải có tối thiểu 6 kí tự"),
    confirmPassword: z.string().min(1, "Confirm Password không được bỏ trống"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
