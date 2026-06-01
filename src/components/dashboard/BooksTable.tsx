import {
  RefreshCw,
  Loader,
  UserPlus,
  Pencil,
  Trash2,
} from "lucide-react";

interface Props {
  books: any[];
  actionInProgress: string | null;
  borrowBook: (id: string) => void;
  returnBook: (id: string) => void;
  deleteBook: (id: string) => void;
  editBook: (id: string) => void;
  viewBook: (id: string) => void;
}

function BooksTable({
  books,
  actionInProgress,
  borrowBook,
  returnBook,
  deleteBook,
  editBook,
  viewBook
}: Props) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="w-full">

        {/* TABLE HEADER */}
        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <tr>
            <th className="px-6 py-4 text-left">
              Title
            </th>

            <th className="px-6 py-4 text-left">
              Author
            </th>

            <th className="px-6 py-4 text-left">
              Genre
            </th>

            <th className="px-6 py-4 text-left">
              Year
            </th>

            <th className="px-6 py-4 text-left">
              Rating
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              onClick={() =>
                viewBook(book._id)
              }
              className={`border-b hover:bg-gray-50 transition ${index % 2 === 0
                  ? "theme-card"
                  : "theme-card"
                }`}

            >
              <td className="px-6 py-4 font-semibold">
                {book.title}
              </td>

              <td className="px-6 py-4">
                {book.author}
              </td>

              <td className="px-6 py-4">
                {book.genre}
              </td>

              <td className="px-6 py-4">
                {book.publishYear}
              </td>

              <td className="px-6 py-4">
                ⭐ {book.rating}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`font-semibold ${book.status === "available"
                      ? "text-green-600"
                      : "text-orange-600"
                    }`}
                >
                  {book.status}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2 flex-wrap">

                  {/* BORROW */}
                  {book.status === "available" ? (
                    <button
                      onClick={() =>
                        borrowBook(book._id)
                      }
                      disabled={
                        actionInProgress === book._id
                      }
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                    >
                      {actionInProgress ===
                        book._id ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <UserPlus className="w-4 h-4" />
                      )}

                      Borrow
                    </button>
                  ) : (
                    
                   <span></span>
                  )}

                  {/* EDIT */}
                  <button
                    onClick={() => editBook(book._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteBook(book._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BooksTable;
