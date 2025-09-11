import BoardItems from "@/components/features/boards/BoardItems";
import BoardList from "@/components/features/boards/BoardList";
import Badge from "@/components/ui/badge/Badge";
import { Grid2X2, SettingsIcon, UserIcon } from "lucide-react";
import React from "react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <section>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            YOUR WORKSPACES
          </h2>
          <div className="py-5 mb-6  ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="font-semibold text-gray-800 text-lg">
                  Sơn PM Workspace
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Badge icon={<Grid2X2 size={16} />}>Board</Badge>
                <Badge icon={<UserIcon size={16} />}>Member</Badge>
                <Badge icon={<SettingsIcon size={16} />}>Setting</Badge>
              </div>
            </div>
          </div>
        </div>
        <BoardList />
      </section>
    </div>
  );
}
