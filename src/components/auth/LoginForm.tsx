import React from "react";
import { Link } from "react-router-dom";
import Input from "../ui/input/Input";

export default function LoginForm() {
  return (
    <form className="space-y-4">
      <div>
        <Input type="text" value="email" label="Email" required />
      </div>
      <div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Password<span className="text-red-500">*</span>
          </label>
          <input
            className="mt-1 flex h-10 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50   "
            type="password"
            name="password"
          />
        </div>
      </div>
      <button
        type="submit"
        className="cursor-pointer inline-flex items-center justify-center rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-blue-600 text-white hover:bg-blue-700 h-10 px-4 py-2 w-full"
      >
        Sign In
      </button>
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
