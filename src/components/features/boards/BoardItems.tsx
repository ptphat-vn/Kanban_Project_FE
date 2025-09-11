import React from "react";
import { useNavigate } from "react-router-dom";
interface BoardProps {
  title: string;
  color?: string;
  id: number;
}
export default function BoardItems({ title, color, id }: BoardProps) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/app/boards/${id}`);
  };
  return (
    <div
      onClick={handleNavigate}
      className="group cursor-pointer transition-all duration-200 hover:scale-105 rounded-xl overflow-hidden border border-gray-200"
    >
      <div
        className="h-32 overflow-hidden relative"
        style={{
          background: color,
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
        </div>
      </div>
      <div className="p-3 bg-white">
        <h3 className="font-medium text-gray-800 text-sm group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
      </div>
    </div>
  );
}
