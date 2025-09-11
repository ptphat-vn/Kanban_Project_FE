interface BadgeProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  classNam?: string;
  onClick?: () => void;
}
export default function Badge({ icon, children, onClick }: BadgeProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center space-x-2 px-4 py-2 text-sm rounded transition-colors cursor-pointer bg-gray-100 text-gray-800 hover:bg-gray-200 undefined"
    >
      {icon && (
        <div
          className="flex items-center justify-center"
          style={{ width: 24, height: 24, cursor: "default" }}
        >
          {icon}
        </div>
      )}
      <span>{children}</span>
    </div>
  );
}
