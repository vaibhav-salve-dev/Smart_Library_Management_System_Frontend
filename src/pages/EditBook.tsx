import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import {
  Loader,
  Pencil,
} from "lucide-react";
import toast from "react-hot-toast";
import type { AppDispatch,RootState } from "../app/store";
import { useDispatch,useSelector } from "react-redux";
import { updateBook,fetchBookById } from "../features/books/bookThunks";

interface BookForm {
  title: string;
  author: string;
  genre: string;
  description: string;
  publishYear: string;
  rating: string;
  coverImage: File | null;
}

function EditBook() {

  const { selectedBook } =
  useSelector(
    (state: RootState) =>
      state.books
  );

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [loading, setLoading] =
    useState(false);

  const [fetchingBook, setFetchingBook] =
    useState(true);

  const [existingImage, setExistingImage] =
   
  useState("");
const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {

  if (id) {

    dispatch(
      fetchBookById(id)
    );

  }

}, [dispatch, id]);

useEffect(() => {

  if (!selectedBook) return;

  setForm({
    title:
      selectedBook.title || "",
    author:
      selectedBook.author || "",
    genre:
      selectedBook.genre || "",
    description:
      selectedBook.description || "",
    publishYear:
      String(
        selectedBook.publishYear || ""
      ),
    rating:
      String(
        selectedBook.rating || ""
      ),
    coverImage: null,
  });

  setExistingImage(
    selectedBook.coverImage || ""
  );

  setFetchingBook(false);

}, [selectedBook]);

  const [form, setForm] =
    useState<BookForm>({
      title: "",
      author: "",
      genre: "",
      description: "",
      publishYear: "",
      rating: "",
      coverImage: null,
    });

  const genres = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "Technology",
    "History",
    "Biography",
    "Mystery",
    "Fantasy",
  ];


  const handleChange = (
    field: keyof BookForm,
    value: string
  ) => {

    setForm({
      ...form,
      [field]: value,
    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

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

    const res =
  await dispatch(
    updateBook({
      id: id!,
      formData,
    })
  ).unwrap();

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
      navigate("/");
    } catch (error: any) {

      toast.error(
        error?.response?.data?.message
        ||
        "Failed to update book"
      );

    } finally {

      setLoading(false);

    }
  };

  if (fetchingBook) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        <Loader className="w-10 h-10 animate-spin" />

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-3xl">

        <div className="glass-card p-8">

          <div className="flex items-center space-x-3 mb-8">

            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">

              <Pencil className="w-6 h-6 text-white" />

            </div>

            <h1 className="text-3xl font-bold">

              Edit Book

            </h1>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                handleChange(
                  "title",
                  e.target.value
                )
              }
              className="input-modern"
              required
            />

            <input
              type="text"
              placeholder="Author"
              value={form.author}
              onChange={(e) =>
                handleChange(
                  "author",
                  e.target.value
                )
              }
              className="input-modern"
              required
            />

            <select
              value={form.genre}
              onChange={(e) =>
                handleChange(
                  "genre",
                  e.target.value
                )
              }
              className="input-modern"
            >

              <option value="">
                Select Genre
              </option>

              {genres.map((genre) => (

                <option
                  key={genre}
                  value={genre}
                >
                  {genre}
                </option>

              ))}

            </select>

            <input
              type="number"
              placeholder="Publish Year"
              value={form.publishYear}
              onChange={(e) =>
                handleChange(
                  "publishYear",
                  e.target.value
                )
              }
              className="input-modern"
            />

            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="Rating"
              value={form.rating}
              onChange={(e) =>
                handleChange(
                  "rating",
                  e.target.value
                )
              }
              className="input-modern"
            />

            <textarea
              rows={4}
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }
              className="input-modern resize-none"
            />

            {/* CURRENT IMAGE */}

            {existingImage && (

              <img
                src={existingImage}
                alt="cover"
                className="w-40 rounded-lg"
              />

            )}

            {/* NEW IMAGE */}

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({
                  ...form,
                  coverImage:
                    e.target.files?.[0] || null,
                })
              }
              className="input-modern"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2"
            >

              {loading ? (

                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Updating...
                </>

              ) : (

                <>
                  <Pencil className="w-5 h-5" />
                  Update Book
                </>

              )}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditBook;