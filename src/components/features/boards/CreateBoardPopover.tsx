import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X } from "lucide-react";
import React, { useState } from "react";

interface CreateBoardPopoverProps {
  children: React.ReactNode;
  onSubmit: (data: { title: string; color: string }) => void;
}

export default function CreateBoardPopover({
  children,
  onSubmit,
}: CreateBoardPopoverProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("rgb(229, 231, 235)");

  const colorOption = [
    "rgb(229, 231, 235)",
    " linear-gradient(135deg, rgb(224, 242, 254) 0%, rgb(14, 165, 233) 100%)",
    "rgb(30, 64, 175)",
    "linear-gradient(135deg, rgb(124, 58, 237) 0%, rgb(236, 72, 153) 100%)",
    "linear-gradient(135deg, rgb(192, 132, 252) 0%, rgb(244, 114, 182) 100%)",
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      color: selectedColor,
    });
    setTitle("");
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent align="start" sideOffset={10} side="right">
        <div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">
                Create board
              </h3>
              <button
                data-slot="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:text-accent-foreground dark:hover:bg-accent/50 gap-1.5 has-[>svg]:px-2.5 h-8 w-8 p-0 rounded-full text-blue-600 hover:bg-blue-50"
              >
                <div
                  className="flex items-center justify-center"
                  style={{ width: 24, height: 24, cursor: "default" }}
                >
                  <X size={16} className="cursor-pointer" />
                </div>
              </button>
            </div>
            <div className="space-y-3">
              <div className="relative h-32 rounded-lg overflow-hidden border border-gray-200">
                <div
                  className="w-full h-full"
                  style={{ background: selectedColor }}
                >
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="flex space-x-2">
                      {[1, 2, 3].map((col) => (
                        <div
                          key={col}
                          className="w-16 h-20 bg-white/80 rounded flex flex-col items-center justify-center"
                        >
                          <div className="w-8 h-2 bg-gray-300 rounded mb-1" />
                          <div className="w-6 h-2 bg-gray-300 rounded mb-1" />
                          <div className="w-7 h-2 bg-gray-300 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Background Color
              </label>
              <div className="flex space-x-2">
                {colorOption.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded border-2 ${
                      selectedColor === color
                        ? "border-blue-500"
                        : "border-gray-200"
                    }  `}
                    style={{ background: color }}
                  />
                ))}

                <button className="w-8 h-8 rounded border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                  <div
                    className="flex items-center justify-center"
                    style={{ width: 24, height: 24, cursor: "default" }}
                  >
                    <svg
                      className="inline-block w-4 h-4 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx={12} cy={12} r={2} />
                      <circle cx={19} cy={12} r={2} />
                      <circle cx={5} cy={12} r={2} />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            <form className="space-y-3" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Board title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter board title"
                    className=" flex h-10 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50   mt-1 "
                    type="text"
                    // defaultValue
                  />
                </div>
              </div>
              <button
                data-slot="button"
                className="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-primary-foreground shadow-xs h-9 px-4 py-2 has-[>svg]:px-3 w-full bg-blue-600 hover:bg-blue-700"
                type="submit"
                disabled={!title}
              >
                Create board
              </button>
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
