import { CheckCircle, XCircle, Info } from "lucide-react";

const CustomToast = ({ t, message, type }) => {
  const typeStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    info: <Info size={20} />,
  };

  return (
    <div
      className={`
        ${t.visible ? "animate-enter" : "animate-leave"}
        max-w-md w-full
        ${typeStyles[type]}
        text-white shadow-lg rounded-xl pointer-events-auto
        flex items-center gap-3 p-4
      `}
    >
      {icons[type]}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default CustomToast;