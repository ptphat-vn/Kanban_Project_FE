import React from "react";
import Input from "../ui/input/Input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = (formData: RegisterFormData) => {
    console.log("datata", formData);
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          {...register("fullname")}
          label="Full Name"
          required
          error={errors.fullname?.message}
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
        <Input type="password" label="Confirm Password" required />
      </div>

      <button
        type="submit"
        className="cursor-pointer inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full"
      >
        Create Account
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
