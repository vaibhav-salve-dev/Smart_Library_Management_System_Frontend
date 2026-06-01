import { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { History as HistoryIcon, BookOpen, Calendar, CheckCircle, XCircle, Loader } from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import type { AppDispatch,RootState } from "../app/store";
import { fetchBorrowHistory } from "../features/borrow/borrowThunks";

interface BookDetails {
  _id: string;
  title: string;
  author: string;
  genre: string;
  coverImage?: string;
}

interface BorrowHistory {
  _id: string;

  bookId: BookDetails;

  status: "borrowed" | "returned";

  createdAt: string;

  returnedAt?: string;
}

function History() {
  const dispatch =
  useDispatch<AppDispatch>();

const {
  history,
  loading,
} = useSelector(
  (state: RootState) =>
    state.borrow
);

  useEffect(() => {

  dispatch(
    fetchBorrowHistory()
  );

}, [dispatch]);

  const getStatusColor = (status: string) => {
    return status === "borrowed" ? "text-yellow-600 bg-yellow-100" : "text-green-600 bg-green-100";
  };

  const getStatusIcon = (status: string) => {
    return status === "borrowed" ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br theme-card">
      <Navbar/>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="glass-card p-8 theme-card border-2 border-gray-500">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
              <HistoryIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Borrow History
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader className="w-12 h-12 animate-spin text-indigo-600" />
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold theme-text mb-2">No History Found</h3>
              <p className="text-gray-500">You haven't borrowed any books yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={item._id}
                  className="theme-card border-1 border-gray-500 rounded-3xl "
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border rounded-2xl border-gray-300 p-5">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="flex gap-4">

                          <img
                            src={
                              item.bookId?.coverImage ||
                              "https://via.placeholder.com/80x110"
                            }
                            alt={item.bookId?.title}
                            className="w-20 h-28 object-cover rounded-lg shadow-md border-1"
                          />

                          <div>

                            <div className="flex items-center space-x-3 mb-2">

                              <BookOpen className="w-5 h-5 text-indigo-600" />

                              <h3 className="text-lg font-semibold text-gray-800">
                                {item.bookId?.title}
                              </h3>

                            </div>

                            <p className="theme-text text-sm mb-1">
                              by {item.bookId?.author}
                            </p>

                            <span className="inline-block bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full">
                              {item.bookId?.genre}
                            </span>

                          </div>

                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm theme-text">
                          <Calendar className="w-4 h-4" />
                          <span>Borrowed: {new Date(item.createdAt).toLocaleString()}</span>
                        </div>

                        {item.returnedAt && (
                          <div className="flex items-center space-x-2 text-sm theme-text">
                            <Calendar className="w-4 h-4" />
                            <span>Returned: {new Date(item.returnedAt).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span>{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default History;