export interface Borrow {
  _id: string;

  bookId: {
    _id: string;
    title: string;
    author: string;
    genre: string;
    description?: string;
    publishYear?: number;
    rating?: number;
    coverImage?: string;
  };

  status: "borrowed" | "returned";

  createdAt: string;

  returnedAt?: string;

  dueDate?: string;
}