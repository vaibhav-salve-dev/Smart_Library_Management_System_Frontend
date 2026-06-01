import { BookOpen, Star, UserPlus, Loader, RefreshCw, Pencil, Trash2, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  publishYear: number;
  rating: number;
  coverImage?: string;
  status: "available" | "borrowed";
  borrowedByCurrentUser?: boolean;
  borrowedBy?: string;
  createdBy?: string;
  isFavorite?: boolean;
}

interface Props {
  book: Book;
  actionInProgress: string | null;
  borrowBook: (id: string) => void;
  returnBook: (id: string) => void;
  deleteBook: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

function BookCard({
  book,
  actionInProgress,
  borrowBook,
  returnBook,
  deleteBook,
  toggleFavorite,
}: Props) {

  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user") || "{}"
    );

  const canManage =

    user?.email === book.createdBy
    ||
    user?.role === "admin";

  const handleDelete = (e: any) => {

    e.stopPropagation();
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this book?"
      );

    if (!confirmDelete) return;

    deleteBook(book._id);
  };

  return (

    <div
      onClick={() =>
        navigate(`/book/${book._id}`)
      }
      className="group theme-card border-1 border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
    >
     

      <div className="h-56  theme-card border-b-1 border-gray-200 rounded-t-lg flex items-center justify-center p-4">
  <img
    src={book.coverImage}
    alt={book.title}
    className="
      h-52
      w-36
      object-cover
      rounded-md
      shadow-xl
      hover:scale-105
      transition
    "
  />
</div>
      <div className="p-5">
        <div className="flex justify-between items-start gap-3">
          <div>
            <h3 className="text-xl font-bold theme-text line-clamp-1">
              {book.title}
            </h3>
            <p className="theme-text-secondary text-sm mt-1">
              by {book.author}
            </p>
          </div>
          <button
            onClick={(e) => {

              e.stopPropagation();

              toggleFavorite(book._id);
            }}
            className="p-2 rounded-lg bg-pink-100 hover:bg-pink-200 transition"
          >

            <Heart
              className={`w-4 h-4 ${book.isFavorite
                  ? "fill-pink-500 text-pink-500"
                  : "text-pink-500"
                }`}
            />

          </button>
          {

            canManage && (
              <div className="flex gap-2">

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(
                      `/edit-book/${book._id}`
                    )
                  }
                  }
                  className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 transition"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  onClick={handleDelete}
                  className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          }
        </div>
        <div className="flex items-center justify-between mt-4 mb-3">
          <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">
            {book.genre}
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm theme-text-secondary ml-1">
              {book.rating}
            </span>
          </div>
        </div>
        <p className="theme-text-secondary text-sm mb-4 line-clamp-2">
          {book.description ||
            "No description available"}
        </p>
        <div className="flex items-center justify-between">
          <span
            className={`text-sm font-semibold ${book.status === "available"
              ? "text-green-600"
              : "text-orange-600"
              }`}
          >
            {
              book.status === "available"
                ? "✓ Available"
                : "📖 Borrowed"
            }
          </span>
          {
            book.status === "available"
              ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    borrowBook(book._id);
                  }}
                  disabled={
                    actionInProgress === book._id
                  }
                  className="btn-primary flex items-center space-x-2 text-sm px-4 py-2"
                >
                  {
                    actionInProgress === book._id
                      ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      )
                      : (
                        <UserPlus className="w-4 h-4" />
                      )

                  }
                  <span>Borrow</span>
                </button>
              )
              : book.borrowedByCurrentUser
                ? (
                
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      returnBook(book._id);
                    }}
                    disabled={actionInProgress === book._id}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition disabled:opacity-50"
                  >
                    {actionInProgress === book._id ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    <span>Return</span>
                  </button>
                )
                : null
          }
        </div>
      </div>
    </div >
  );
}

export default BookCard;
