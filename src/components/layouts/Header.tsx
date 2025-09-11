import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const { logout, user } = useAuth();
  return (
    <header className="bg-white text-gray-900 border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between h-14 px-4">
        <Link
          className="flex items-center space-x-3"
          to="/"
          data-discover="true"
        >
          <div className="flex items-center space-x-2">
            <div
              className="flex items-center justify-center"
              style={{ width: 24, height: 24, cursor: "default" }}
            >
              <svg
                className="inline-block text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </svg>
            </div>
            <h1 className="text-md font-bold">Kanban</h1>
          </div>
        </Link>
        <div className="flex-1 max-w-3xl mx-8 flex items-center space-x-2">
          <div className="relative flex-1">
            <div className="relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 pl-3 flex items-center pointer-events-none">
                <div
                  className="flex items-center justify-center"
                  style={{ width: 24, height: 24, cursor: "default" }}
                >
                  <svg
                    className="inline-block text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                </div>
              </div>
              <input
                placeholder="Search"
                className="pr-10 flex h-10 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 pl-10  "
                type="text"
              />
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Create
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors"
                type="button"
                id="radix-«r0»"
                aria-haspopup="menu"
                aria-expanded="false"
                data-state="closed"
                data-slot="dropdown-menu-trigger"
              >
                <span className="text-white font-semibold">
                  {user?.data.name.charAt(0).toUpperCase() || "U"}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="cursor-pointer">
                Manager Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="cursor-pointer text-red-600"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
