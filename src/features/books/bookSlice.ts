import { createSlice } from "@reduxjs/toolkit";

import {
  fetchBooks,
  borrowBook,
  returnBook,
  deleteBook,
  toggleFavorite,
  addBook,
  fetchBookById,
  updateBook,
} from "./bookThunks";

import type { Book } from "./bookTypes";

interface BookState {
  books: Book[];
  loading: boolean;
  page: number;
  hasMore: boolean;
  actionInProgress: string | null;
  selectedBook: Book | null;
error: string | null;
}

const initialState: BookState = {
  books: [],
  loading: false,
  hasMore: true,
  page: 1,
  actionInProgress: null,
  selectedBook: null,
  error: null,
};

const bookSlice = createSlice({
  name: "books",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })

     .addCase(fetchBooks.fulfilled, (state, action) => {

  state.loading = false;

  if (action.payload.page === 1) {

    state.books =
      action.payload.books;

  } else {

    const existingIds =
  new Set(
    state.books.map(
      (book) => book._id
    )
  );

const newBooks =
  action.payload.books.filter(
    (book:any) =>
      !existingIds.has(book._id)
  );

state.books = [
  ...state.books,
  ...newBooks
];
  }

  state.page =
    action.payload.page;

  state.hasMore =
    action.payload.page <
    action.payload.totalPages;

})
      .addCase(fetchBooks.rejected, (state) => {
        state.loading = false;
      })
      .addCase(borrowBook.pending, (state, action) => {

  state.actionInProgress =
    action.meta.arg;

})

.addCase(borrowBook.fulfilled, (state, action) => {

  console.log("res:",action);
  state.actionInProgress = null;

  state.books = state.books.map((book) =>

    book._id === action.payload.book._id
      ? action.payload.book
      : book

  );
})

.addCase(borrowBook.rejected, (state) => {

  state.actionInProgress = null;

})

.addCase(returnBook.pending, (state, action) => {

  state.actionInProgress =
    action.meta.arg;

})

.addCase(returnBook.fulfilled, (state, action) => {

  state.actionInProgress = null;

  state.books = state.books.map((book) =>

    book._id === action.payload.book._id
      ? action.payload.book
      : book

  );
})

.addCase(returnBook.rejected, (state) => {

  state.actionInProgress = null;

})
.addCase(deleteBook.pending, (state, action) => {

  state.actionInProgress =
    action.meta.arg;

})

.addCase(deleteBook.fulfilled, (state, action) => {
  state.books = state.books.filter(
    book => book._id !== action.payload.id
  );
})

.addCase(deleteBook.rejected, (state) => {

  state.actionInProgress = null;

})
.addCase(
  toggleFavorite.fulfilled,
  (state, action) => {

    const book =
      state.books.find(
        (b) =>
          b._id === action.payload.id
      );

    if (book) {

      book.isFavorite =
        action.payload.isFavorite;
    }
  }
)
.addCase(fetchBookById.pending, (state) => {
  state.loading = true;
})

.addCase(
  fetchBookById.fulfilled,
  (state, action) => {

    state.loading = false;

    state.selectedBook =
      action.payload;
  }
)

.addCase(fetchBookById.rejected, (state) => {
  state.loading = false;
})

.addCase(addBook.pending, (state) => {
  state.loading = true;
})

.addCase(addBook.fulfilled, (state) => {
  state.loading = false;
})

.addCase(addBook.rejected, (state) => {
  state.loading = false;
})

.addCase(updateBook.pending, (state) => {
  state.loading = true;
})

.addCase(updateBook.fulfilled, (state) => {
  state.loading = false;
})

.addCase(updateBook.rejected, (state) => {
  state.loading = false;
})
  },
});

export default bookSlice.reducer;