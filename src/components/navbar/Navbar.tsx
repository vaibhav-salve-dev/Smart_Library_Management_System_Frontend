import { Link, useNavigate, useLocation } from "react-router-dom";
import { BookOpen, PlusCircle, History, LogOut, Home, Menu, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    theme,
    toggleTheme,
  } = useTheme();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    // navigate("/login");
    setTimeout(() => {
      window.location.href = "/login"
    }, 800)
  };

  const navLinks = [
    { path: "/", icon: Home, label: "Books" },
    { path: "/my-borrowings", icon: BookOpen, label: "My Borrowings" },
    { path: "/add-book", icon: PlusCircle, label: "Add Book" },
    { path: "/history", icon: History, label: "History" },
    {
      path: "/analytics",
      icon: BookOpen,
      label: "Analytics",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-800 text-white shadow-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <BookOpen className="w-8 h-8 text-indigo-300 group-hover:text-white transition-colors duration-300" />
              <span className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                BookLibrary
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${isActive(link.path)
                    ? "bg-white/20 backdrop-blur-lg shadow-lg"
                    : "hover:bg-white/10"
                    }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="px-3 py-2"
              >
                {theme === "dark"
                  ? <Sun />
                  : <Moon />}
              </button>

              <button
                onClick={logout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-all duration-300 ml-4"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 animate-slideDown">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${isActive(link.path)
                    ? "bg-white/20 backdrop-blur-lg"
                    : "hover:bg-white/10"
                    }`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              ))}
              <button
  onClick={toggleTheme}
  className="flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-white/10 w-full"
>
  {theme === "dark" ? <Sun /> : <Moon />}
  <span>
    {theme === "dark"
      ? "Light Mode"
      : "Dark Mode"}
  </span>
</button>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-all duration-300 w-full mt-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default Navbar;