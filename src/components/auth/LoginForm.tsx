import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../ui/input/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../../schemas/auth";
import { useLoginMutation } from "../../store/api/baseApi";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { toast } from "sonner";

export default function LoginForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  //useForm bao gồm register, handleSubmit, và khi formState có lỗi trả ra errors

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const onSubmit = async (formData: LoginFormData) => {
    try {
      const result = await login(formData).unwrap();
      dispatch(
        setAuth({
          accessToken: result.data.accessToken,
          refreshToken: result.data.refreshToken,
        })
      );
      toast.success(result?.message || "Đăng nhập thành công!");
      navigate("/app/dashboard");
    } catch (error: any) {
      // setError("root", {
      //   type: "manual",
      //   message: error.data?.message || "Đăng nhập thất bại, Vui lòng thử lại",
      // });
      toast.error(
        error.data?.message || "Đăng nhập thất bại, Vui lòng thử lại"
      );
    }
    // console.log("data", formData);
  };
  return (
    <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          {...register("email")}
          label="Email"
          required
          error={errors.email?.message}
        />
      </div>
      <div>
        <Input
          {...register("password")}
          type="password"
          label="Password"
          required
          error={errors.password?.message}
        />
      </div>
      <button
        type="submit"
        className="cursor-pointer inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full"
      >
        Sign In
      </button>
      {/* {errors.root?.message && (
        <span className="text-red-400 text-xs">{errors.root?.message}</span>
      )} */}
      <p className="mt-2 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          className="font-medium text-blue-600 hover:text-blue-500"
          data-discover="true"
          to="/auth/register"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
