import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { BookOpen, RefreshCw, Calendar, Clock, AlertCircle, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
import type { AppDispatch,RootState } from "../app/store";
import { fetchBorrowHistory,returnBorrowedBook, } from "../features/borrow/borrowThunks";

function MyBorrowings() {
 const dispatch =
  useDispatch<AppDispatch>();

const {
  history,
  loading,
  actionInProgress,
} = useSelector(
  (state: RootState) =>
    state.borrow
);
 
 useEffect(() => {

  dispatch(
    fetchBorrowHistory()
  );

}, [dispatch]);

 const returnBook =
  async (
    id: string,
    bookId: string
  ) => {

    try {

      await dispatch(
        returnBorrowedBook(
          bookId
        )
      ).unwrap();

      toast.success(
        "Book returned successfully!"
      );

    } catch {

      toast.error(
        "Cannot return this book"
      );

    }
  };

  const getDaysRemaining = (dueDate?: string) => {
    if (!dueDate) return null;
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const validBorrowings = history.filter((b) => b.bookId);
  const activeBorrowings = validBorrowings.filter((b) => b.status === "borrowed");
  const returnedBorrowings = validBorrowings.filter((b) => b.status === "returned");

  return (
    <div className="theme-card min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="theme-card container mx-auto px-4 py-8 max-w-6xl">
        <div className="theme-card border-1  border-gray-600 rounded-4xl glass-card p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Borrowings
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="w-12 h-12 animate-spin text-indigo-600" />
            </div>
          ) : (
            <>
              {/* Active Borrowings Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm mr-3">
                    {activeBorrowings.length}
                  </span>
                  Currently Borrowed
                </h2>

                {activeBorrowings.length === 0 ? (
                  <div className="theme-card border rounded-lg p-8 text-center shadow-md">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No books borrowed at the moment</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {activeBorrowings.map((borrowing) => {
                      const daysRemaining = getDaysRemaining(borrowing.dueDate);
                      const isOverdue = daysRemaining !== null && daysRemaining < 0;

                      return (
                        <div
                          key={borrowing._id}
                          className="theme-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                        >
                          <div className="theme-card border-1 border-gray-100 rounded-4xl flex flex-col md:flex-row">
                            {/* Image Section */}
                            <img
                              src={borrowing.bookId?.coverImage || "/placeholder-book.png"}
                              alt={borrowing.bookId.title}
                              className="w-full md:w-44 h-64 md:h-auto object-cover"
                            />

                            {/* Content Section */}
                            <div className="flex-1 p-5">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-2xl font-bold theme-text mb-1">
                                    {borrowing.bookId.title}
                                  </h3>
                                  <p className="theme-text-secondary
">
                                    by {borrowing.bookId.author}
                                  </p>
                                </div>
                                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold">
                                  Borrowed
                                </span>
                              </div>

                              {/* Genre + Rating */}
                              <div className="flex items-center gap-3 mt-4 flex-wrap">
                                <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                                  {borrowing.bookId.genre}
                                </span>
                                <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                                  <span>⭐</span> {borrowing.bookId.rating}
                                </span>
                                <span className="theme-text-secondary text-sm">
                                  {borrowing.bookId.publishYear}
                                </span>
                              </div>

                              {/* Description */}
                              <p className="theme-text-secondary
 mt-4 line-clamp-3 text-sm">
                                {borrowing.bookId.description || "No description available"}
                              </p>

                              {/* Dates */}
                              <div className="space-y-2 mt-5">
                                <div className="flex items-center text-sm theme-text-secondary">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Borrowed: {new Date(borrowing.createdAt).toLocaleDateString()}
                                </div>

                                {borrowing.dueDate && (
                                  <div className="flex items-center text-sm">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span className={isOverdue ? "text-red-600 font-semibold" : "theme-text-secondary"}>
                                      Due: {new Date(borrowing.dueDate).toLocaleDateString()}
                                      {isOverdue && " (Overdue)"}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Return Button */}
                              <button
                                onClick={() => returnBook(borrowing._id, borrowing.bookId._id)}
                                disabled={actionInProgress === borrowing.bookId._id}
                                className="mt-6 w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {actionInProgress === borrowing.bookId._id ? (
                                  <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                  <RefreshCw className="w-4 h-4" />
                                )}
                                <span>Return Book</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Return History Section */}
              {returnedBorrowings.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold theme-text mb-4 flex items-center">
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm mr-3">
                      {returnedBorrowings.length}
                    </span>
                    Return History
                  </h2>

                  <div className="space-y-3">
                    {returnedBorrowings.map((borrowing) => (
                      <div 
                        key={borrowing._id} 
                        className="theme-card border-2 border-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold theme-text text-lg">
                              {borrowing.bookId.title}
                            </h3>
                            <p className="text-sm theme-text-secondary mt-1">
                              by {borrowing.bookId.author}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-2 text-sm theme-text-secondary">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Borrowed: {new Date(borrowing.createdAt).toLocaleDateString()}
                              </span>
                              {borrowing.returnedAt && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  Returned: {new Date(borrowing.returnedAt).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold self-start md:self-center">
                            Returned
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBorrowings;