import React from "react";
import Input from "../ui/input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/store/api/baseApi";
import { toast } from "sonner";

export default function RegisterForm() {
  const [registerApi, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    //ràng buộc m phải theo quy chuẩn t đặt ra
  });
  const onSubmit = async (formData: RegisterFormData) => {
    const { confirmPassword, ...registerData } = formData;
    console.log(registerData);

    try {
      const result = await registerApi(registerData);
      toast.success(result.data?.message || "Đăng ký thành công!!");
      navigate("/auth/login");
    } catch (error: any) {
      console.log(error, "error");
      toast.error(error.data?.message);
    }
    console.log("datata", formData);
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          {...register("name")}
          label="Full Name"
          required
          error={errors.name?.message}
        />
      </div>
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
          {...register("phone")}
          label="Phone"
          required
          error={errors.phone?.message}
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
      <div>
        <Input
          {...register("confirmPassword")}
          type="password"
          label="Confirm Password"
          required
          error={errors.confirmPassword?.message}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="cursor-pointer inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full"
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </button>
      <p className="mt-2 text-center text-sm text-gray-600">
        ALready have an account?{" "}
        <Link
          className="font-medium text-blue-600 hover:text-blue-500"
          data-discover="true"
          to="/auth/login"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
