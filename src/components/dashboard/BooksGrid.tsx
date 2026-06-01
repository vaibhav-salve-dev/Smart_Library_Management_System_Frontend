import BookCard from "./BookCard";

interface Props {
  books: any[];
  actionInProgress: string | null;
  borrowBook: (id: string) => void;
  returnBook: (id: string) => void;
  deleteBook: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

function BooksGrid({
  books,
  actionInProgress,
  borrowBook,
  returnBook,
  deleteBook,
  toggleFavorite,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
          actionInProgress={actionInProgress}
          borrowBook={borrowBook}
          returnBook={returnBook}
          deleteBook={deleteBook}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

export default BooksGrid;
