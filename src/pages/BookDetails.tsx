import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { ArrowLeft, BookOpen, Star } from "lucide-react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";

import { fetchBookById } from "../features/books/bookThunks";

import type { RootState, AppDispatch } from "../app/store";

function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch =
    useDispatch<AppDispatch>();

  const {
    selectedBook,
    loading,
  } = useSelector(
    (state: RootState) =>
      state.books
  );

  const book = selectedBook;
  useEffect(() => {
    if (id) {
      dispatch(
        fetchBookById(id)
      );
    }
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold">Book not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 bg-white"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white">

          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

              <div className="grid lg:grid-cols-5 gap-0">

                {/* BOOK COVER */}
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-100 to-slate-200 p-8 flex justify-center">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className=" w-72 h-[420px] object-cover rounded-r-lg shadow-2xl border-l-8 border-gray-300 hover:scale-105 transition"/>
                  ) : (
                    <div className="w-72 h-[420px] rounded-r-lg bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-2xl border-l-8 border-indigo-800">
                      <BookOpen className="w-24 h-24 text-white/60" />
                    </div>
                  )}
                </div>

                {/* DETAILS */}
                <div className="lg:col-span-3 p-10">

                  <h1 className="text-5xl font-bold text-gray-900 mb-2">
                    {book.title}
                  </h1>

                  <p className="text-xl text-gray-500 mb-6">
                    by {book.author}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">

                    <span className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                      {book.genre}
                    </span>

                    <span className="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-medium flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      {book.rating || "N/A"}
                    </span>

                    <span
                      className={`px-4 py-2 rounded-full font-medium ${book.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                        }`}
                    >
                      {book.status}
                    </span>

                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-500 text-sm">
                        Publish Year
                      </p>
                      <p className="font-semibold text-lg">
                        {book.publishYear || "N/A"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-gray-500 text-sm">
                        Added By
                      </p>
                      <p className="font-semibold text-lg">
                        {book.createdBy || "Unknown"}
                      </p>
                    </div>

                  </div>

                  <div className="border-t pt-6">
                    <h2 className="text-2xl font-bold mb-3">
                      Description
                    </h2>

                    <p className="text-gray-600 leading-8 text-lg">
                      {book.description || "No description available"}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default BookDetails;