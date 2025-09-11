import React from "react";

export default function SideBar() {
  return (
    <aside className="w-80 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-3 p-2 bg-blue-50 rounded text-blue-700 cursor-pointer">
            <div
              className="flex items-center justify-center"
              style={{ width: 24, height: 24, cursor: "default" }}
            >
              <svg
                className="inline-block w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </svg>
            </div>
            <span className="font-medium">Boards</span>
          </div>
          <div className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-50 rounded cursor-pointer">
            <div
              className="flex items-center justify-center"
              style={{ width: 24, height: 24, cursor: "default" }}
            >
              <svg
                className="inline-block w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
              </svg>
            </div>
            <span>Templates</span>
          </div>
          <div className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-50 rounded cursor-pointer">
            <div
              className="flex items-center justify-center"
              style={{ width: 24, height: 24, cursor: "default" }}
            >
              <svg
                className="inline-block w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span>Home</span>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Workspaces
          </h3>
          <div className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-50 rounded cursor-pointer">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">K</span>
            </div>
            <span className="text-sm">Sơn PM Workspace</span>
            <div
              className="flex items-center justify-center"
              style={{ width: 24, height: 24, cursor: "default" }}
            >
              <svg
                className="inline-block w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
