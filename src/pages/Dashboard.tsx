import { useEffect, useState } from "react";

import Navbar from "../components/navbar/Navbar";
import HeroSection from "../components/dashboard/HeroSection";
import SearchFilter from "../components/dashboard/SearchFilter";
import BooksGrid from "../components/dashboard/BooksGrid";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  fetchBooks,
  borrowBook,
  returnBook,
  deleteBook,
  toggleFavorite,
} from "../features/books/bookThunks";

import BooksTable from "../components/dashboard/BooksTable";
import FilterSidebar from "../components/dashboard/FilterSidebar";

function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { books, loading, page, hasMore, actionInProgress } =
    useAppSelector((state) => state.books);

  const [search, setSearch] = useState("");

  const [view, setView] = useState<"grid" | "table">("grid");

  const [filters, setFilters] = useState({
    genre: "",
    status: "",
    minRating: "",
    minYear: "",
    maxYear: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        fetchBooks({
          page: 1,
          limit: 10,
          search,
          ...filters,
        })
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [search, filters, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (bottom && !loading && hasMore) {
        dispatch(
          fetchBooks({
            page: page + 1,
            limit: 10,
            search,
            ...filters,
          })
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, page, search, filters]);

  return (
<div className="min-h-screen theme-card">    <Navbar />

    <div className="container mx-auto px-4 py-8">
        <HeroSection />

        <SearchFilter
          search={search}
          setSearch={setSearch}
          fetchBooks={() =>
            dispatch(
              fetchBooks({
                page: 1,
                limit: 10,
                search,
                ...filters,
              })
            )
          }
        />

        {/* FILTER BUTTON */}
        <button
          onClick={() => setShowFilters(true)}
          className="
            mb-6 px-4 py-2 rounded-lg font-semibold
            bg-white text-black
          "
        >
          Filters
        </button>

        <FilterSidebar
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />

        {/* VIEW TOGGLE */}
        <div className="flex justify-end mb-6 gap-3">
          <button
            onClick={() => setView("grid")}
            className={`
              px-4 py-2 rounded-lg font-semibold
              ${view === "grid"
                ? "bg-indigo-600 text-white"
                : "bg-white text-black"
              }
            `}
          >
            Card View
          </button>

          <button
            onClick={() => setView("table")}
            className={`
              px-4 py-2 rounded-lg font-semibold
              ${view === "table"
                ? "bg-indigo-600 text-white"
                : "bg-white text-black"
              }
            `}
          >
            Table View
          </button>
        </div>

        {/* CONTENT */}
        {books.length > 0 ? (
          view === "grid" ? (
            <BooksGrid
              books={books}
              actionInProgress={actionInProgress}
              borrowBook={(id) => dispatch(borrowBook(id))}
              returnBook={(id) => dispatch(returnBook(id))}
              deleteBook={async (id) => {
                const res =await dispatch(deleteBook(id)).unwrap();
                console.log("res:",res);
                if(!res.success)
                {
                  toast.error(res.messag || "Internal Server error");
                  return;
                }
                toast.success("Book deleted successfully");
              }
            }
              toggleFavorite={(id) => dispatch(toggleFavorite(id))}
            />
          ) : (
            <BooksTable
              books={books}
              actionInProgress={actionInProgress}
              borrowBook={(id) => dispatch(borrowBook(id))}
              returnBook={(id) => dispatch(returnBook(id))}
              deleteBook={(id) => dispatch(deleteBook(id))}
              editBook={(id) => navigate(`/edit-book/${id}`)}
              viewBook={(id) => navigate(`/book/${id}`)}
            />
          )
        ) : (
          !loading && <EmptyState />
        )}

        {loading && (
          <div className="flex justify-center py-6">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
