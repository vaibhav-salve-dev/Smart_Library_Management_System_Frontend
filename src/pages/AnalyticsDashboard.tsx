import { useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchAnalytics } from "../features/analytics/analyticsThunk";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { deleteBook } from "../features/books/bookThunks";
import { Pencil, Trash2, Heart, BookOpen } from "lucide-react";
import toast from "react-hot-toast";
function Analytics() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { analytics, loading, recentBooks, favouriteBooksList } =
    useAppSelector((state) => state.analytics);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen theme-page">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="theme-text-secondary mt-2">Overview of your library statistics</p>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {[
            ["Total Books", analytics?.stats?.totalBooks],
            ["My Books", analytics?.stats?.myBooks],
            ["Favourite Books", analytics?.stats?.favoriteBooks],
            ["Currently Borrowed", analytics?.stats?.currentBorrowed],
            ["Total Borrowed", analytics?.stats?.totalBorrowed],
          ].map(([label, value]) => (
            <div
              key={label}
              className="theme-card rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border border-gray-300"
            >
              <p className="text-lg theme-text-secondary font-medium mb-2 text-center">{label}</p>
              <p className="text-3xl font-bold theme-text-secondary text-center">{value || 0}</p>
            </div>
          ))}
        </div>

        {/* RECENT BOOKS SECTION */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold theme-text">Recently Added Books</h2>
            <span className="text-sm theme-text-secondary">{recentBooks.length} books</span>
          </div>

          {recentBooks.length === 0 ? (
            <div className="theme-card rounded-xl shadow-md p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="theme-text-secondary text-lg">No books added yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recentBooks.map((book: any) => {
                const canManage = user?.email === book.createdBy || user?.role === "admin";

                return (
                  <div
                    key={book._id}
                    onClick={() => navigate(`/book/${book._id}`)}
                    className=" group border-2 border-gray-200 theme-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  >
                    {/* Book Cover */}
                    <div className="h-56 theme-card flex items-center justify-center p-4 border-1 rounded-t-lg border-white">
                      {book.coverImage ? (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className=" h-52 w-36 object-cover rounded-md shadow-xl group-hover:scale-105 transition"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-16 h-16 text-blue-500 opacity-50" />
                        </div>
                      )}
                    </div>

                    {/* Book Info */}
                    <div className="p-4">
                      <h3 className="font-bold theme-text text-lg mb-1 line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="theme-text-secondary text-sm mb-2">by {book.author}</p>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-medium">
                          {book.genre}
                        </span>

                        {canManage && (
                          <div className="flex gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/edit-book/${book._id}`);
                              }}
                              className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (window.confirm("Delete this book?")) {
                                  try {
                                    const result = await dispatch(
                                      deleteBook(book._id)
                                    ).unwrap();

                                    toast.success(result.message);

                                    dispatch(fetchAnalytics());

                                  } catch (error: any) {

                                    toast.error(
                                      error?.message || "Failed to delete book"
                                    );

                                  }
                                }
                              }}
                              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FAVOURITE BOOKS SECTION */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Heart className="text-red-500 fill-red-500 w-6 h-6" />
              <h2 className="text-2xl font-bold theme-text">Favourite Books</h2>
            </div>
            <span className="text-sm theme-text-secondary">{favouriteBooksList.length} favourites</span>
          </div>

          {favouriteBooksList.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="theme-text-secondary text-lg">No favourite books yet</p>
              <p className="text-gray-400 text-sm mt-2">Click the heart icon on any book to add to favourites</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favouriteBooksList.map((book: any) => (
                <div
                  key={book._id}
                  onClick={() => navigate(`/book/${book._id}`)}
                  className=" group border-2 border-gray-200 theme-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Book Cover */}
                  <div className="h-56 border-1 border-white flex items-center justify-center p-4">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className=" h-52 w-36 object-cover rounded-md shadow-xl group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-white opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Heart className="text-red-500 fill-red-500 w-5 h-5" />
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-4">
                    <h3 className="font-bold theme-text text-lg mb-1 line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="theme-text-secondary text-sm mb-2">by {book.author}</p>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full font-medium">
                        {book.genre}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-yellow-500">
                        ⭐ {book.rating || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics;