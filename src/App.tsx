import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import History from "./pages/History";
import MyBorrowings from "./pages/MyBorrowings";
import EditBook from "./pages/EditBook";
import BookDetails from "./pages/BookDetails";
import Analytics from "./pages/AnalyticsDashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const isValid = token && token !== "undefined" && token !== "null";
      setIsAuthenticated(isValid);
      setLoading(false);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/add-book"
          element={isAuthenticated ? <AddBook /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/edit-book/:id"
          element={<EditBook />}
        />
        <Route
          path="/history"
          element={isAuthenticated ? <History /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/book/:id"
          element={<BookDetails />}
        />
        <Route
          path="/analytics"
          element={<Analytics />}
        />
        <Route
          path="/my-borrowings"
          element={isAuthenticated ? <MyBorrowings /> : <Navigate to="/login" replace />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;