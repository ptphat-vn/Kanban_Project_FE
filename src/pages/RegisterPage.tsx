import React from "react";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 space-y-8 max-w-md w-full">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-2">
          <div style={{ width: 48, height: 48, cursor: "default" }}>
            <svg
              className="inline-block text-blue-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
            </svg>
          </div>
          <span className="text-2xl font-semibold">Kanban</span>
        </div>
        <h2 className="mt-2 text-center text-xl font-bold text-gray-900">
          Create your account
        </h2>
      </div>
      <RegisterForm />
    </div>
  );
}
