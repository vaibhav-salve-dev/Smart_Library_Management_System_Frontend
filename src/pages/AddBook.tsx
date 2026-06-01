import {
  useState,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import { PlusCircle, X, Image as ImageIcon, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../app/store";
import { addBook } from "../features/books/bookThunks";

interface BookForm {
  title: string;
  author: string;
  genre: string;
  description: string;
  publishYear: string;
  rating: string;
  coverImage: File | null;
}

function AddBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState<BookForm>({
    title: "",
    author: "",
    genre: "",
    description: "",
    publishYear: "",
    rating: "",
    coverImage: null
  });
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const titleRef =
    useRef<HTMLInputElement>(null);

  const authorRef =
    useRef<HTMLInputElement>(null);

  const genreRef =
    useRef<HTMLSelectElement>(null);

  const publishYearRef =
    useRef<HTMLInputElement>(null);

  const ratingRef =
    useRef<HTMLInputElement>(null);

  const coverImageRef =
    useRef<HTMLInputElement>(null);

  const descriptionRef =
    useRef<HTMLTextAreaElement>(null);

  const submitButtonRef =
    useRef<HTMLButtonElement>(null);

  const genres = ["Fiction", "Non-Fiction", "Science", "Technology", "History", "Biography", "Mystery", "Fantasy"];

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      !form.title ||
      !form.author ||
      !form.genre
    ) {
      toast.error(
        "Please fill in all required fields"
      );

      return;
    }

    setLoading(true);

    try {

      const formData =
        new FormData();

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "author",
        form.author
      );

      formData.append(
        "genre",
        form.genre
      );

      formData.append(
        "description",
        form.description
      );

      formData.append(
        "publishYear",
        form.publishYear
      );

      formData.append(
        "rating",
        form.rating
      );

      if (form.coverImage) {

        formData.append(
          "coverImage",
          form.coverImage
        );
      }

      const res = await dispatch(
        addBook(formData)
      ).unwrap();
      console.log("errors:", res.errors);
      console.log("error type:", typeof (res.errors));
      console.log("ff: ", res);
      if (!res.success) {

        if (res.errors) {

          Object.values(res.errors).forEach((error: any) => {
            toast.error(error);
          });

        } else {

          toast.error(
            res.message || "Unable to add Book!"
          );

        }

        return;
      }
      toast.success(
        "Book added successfully!"
      );

      setTimeout(
        () => navigate("/"),
        1500
      );

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message
        ||
        "Failed to add book"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleChange = (field: keyof BookForm, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleEnter = (
    e: React.KeyboardEvent,
    nextRef: any,
    openSelect: boolean = false
  ) => {

    if (e.key === "Enter") {

      e.preventDefault();

      const currentField =
        e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

      if (!currentField.checkValidity()) {

        currentField.reportValidity();

        return;
      }

      nextRef?.current?.focus();
      if (openSelect) {
        const event = new KeyboardEvent(
          "keydown",
          {
            key: "ArrowDown",
            bubbles: true,
          }
        );

        nextRef.current.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="min-h-screen theme-card">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="glass-card p-8 theme-card border-2 border-gray-500">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
              <PlusCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Add New Book
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold theme-text mb-2">
                  Title *
                </label>
                <input
                  ref={titleRef}
                  autoFocus
                  type="text"
                  placeholder="Enter book title"
                  value={form.title}
                  onChange={(e) =>
                    handleChange(
                      "title",
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleEnter(e, authorRef)
                  }
                  className="input-modern"
                  required
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold theme-text mb-2">
                  Author *
                </label>
                <input
                  ref={authorRef}
                  type="text"
                  placeholder="Author name"
                  value={form.author}
                  onChange={(e) =>
                    handleChange(
                      "author",
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleEnter(
                      e,
                      genreRef,
                      true
                    )
                  }
                  className="input-modern"
                  required
                />
              </div>
              {/* Genre */}
              <div>
                <label className="block text-sm font-semibold theme-text mb-2">
                  Genre *
                </label>
                <select
                  ref={genreRef}
                  value={form.genre}
                  onChange={(e) =>
                    handleChange(
                      "genre",
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleEnter(
                      e,
                      publishYearRef
                    )
                  }
                  className="input-modern cursor-pointer"
                  required
                >
                  <option value="">Select genre</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              {/* Publish Year */}
              <div>
                <label className="block text-sm font-semibold theme-text mb-2">
                  Publish Year
                </label>
                <input
                  ref={publishYearRef}
                  type="number"
                  placeholder="2024"
                  value={form.publishYear}
                  onChange={(e) =>
                    handleChange(
                      "publishYear",
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleEnter(e, ratingRef)
                  }
                  className="input-modern"
                />              </div>
              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold theme-text mb-2">
                  Rating (0-5)
                </label>
                <input
                  ref={ratingRef}
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="4.5"
                  value={form.rating}
                  onChange={(e) =>
                    handleChange(
                      "rating",
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleEnter(
                      e,
                      coverImageRef
                    )
                  }
                  className="input-modern"
                />
              </div>

              {/* Cover Image */}

              <div className="md:col-span-2">

                <label className="block text-sm font-semibold theme-text mb-2">
                  Cover Image
                </label>

                <div className="relative">

                  <input
                    ref={coverImageRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        coverImage:
                          e.target.files?.[0] || null
                      })
                    }
                    onKeyDown={(e) =>
                      handleEnter(
                        e,
                        descriptionRef
                      )
                    }
                    className="input-modern"
                  />

                </div>

              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold theme-text mb-2">
                  Description
                </label>
                <textarea
                  ref={descriptionRef}
                  rows={4}
                  placeholder="Enter book description..."
                  value={form.description}
                  onChange={(e) =>
                    handleChange(
                      "description",
                      e.target.value
                    )
                  }
                  onKeyDown={(e) =>
                    handleEnter(
                      e,
                      submitButtonRef
                    )
                  }
                  className="input-modern resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                ref={submitButtonRef}
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 flex items-center justify-center space-x-2 py-3 focus:ring-4 focus:ring-indigo-300"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Adding Book...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-5 h-5" />
                    <span>Add Book</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn-secondary flex-1 flex items-center justify-center space-x-2 py-3"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBook;
