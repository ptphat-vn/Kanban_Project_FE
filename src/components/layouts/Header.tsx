import { useAuth } from "@/hooks/useAuth";
import React from "react";

export default function Header() {
  const { logout } = useAuth();
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-3xl font-bold text-gray-900">Kanban Board</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, Phatpt!</span>
            <button
              onClick={logout}
              type="button"
              className="cursor-pointer inline-flex item-center justify-center border px-5 py-2 rounded-lg "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
