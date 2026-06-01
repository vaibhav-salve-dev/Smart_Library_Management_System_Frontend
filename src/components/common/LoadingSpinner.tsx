import { Loader } from "lucide-react";

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <Loader className="w-12 h-12 animate-spin text-indigo-600" />
    </div>
  );
}

export default LoadingSpinner;
