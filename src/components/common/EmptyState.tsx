import { BookOpen } from "lucide-react";

function EmptyState() {
  return (
    <div className="text-center py-16">
      <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />

      <h3 className="text-2xl font-semibold text-gray-600 mb-2">
        No books found
      </h3>

      <p className="text-gray-500">
        Try adjusting your search
      </p>
    </div>
  );
}

export default EmptyState;
