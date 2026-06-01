import { createSlice } from "@reduxjs/toolkit";

import { fetchActiveBorrows,fetchBorrowHistory,returnBorrowedBook }
from "./borrowThunks";

import type { Borrow }
from "./borrowTypes";

interface BorrowState {

  borrows: Borrow[];

  history: Borrow[];

  loading: boolean;

  actionInProgress:
    string | null;
}

const initialState: BorrowState = {

  borrows: [],

  history: [],

  loading: false,

  actionInProgress: null,
};

const borrowSlice = createSlice({
  name: "borrow",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchActiveBorrows.pending,
        (state) => {

          state.loading = true;

        }
      )

      .addCase(
        fetchActiveBorrows.fulfilled,
        (state, action) => {

          state.loading = false;

          state.borrows =
            action.payload;

        }
      )

      .addCase(
        fetchActiveBorrows.rejected,
        (state) => {

          state.loading = false;

        }
      )
      .addCase(
  fetchBorrowHistory.pending,
  (state) => {

    state.loading = true;

  }
)

.addCase(
  fetchBorrowHistory.fulfilled,
  (state, action) => {

    state.loading = false;

    state.history =
      action.payload;

  }
)

.addCase(
  fetchBorrowHistory.rejected,
  (state) => {

    state.loading = false;

  }
)
.addCase(
  returnBorrowedBook.pending,
  (state, action) => {

    state.actionInProgress =
      action.meta.arg;

  }
)

.addCase(
  returnBorrowedBook.fulfilled,
  (state, action) => {

    state.actionInProgress =
      null;

    const borrow =
      state.history.find(
        (b) =>
          b.bookId._id ===
          action.payload.bookId
      );

    if (borrow) {

      borrow.status =
        "returned";

      borrow.returnedAt =
        new Date().toISOString();
    }
  }
)

.addCase(
  returnBorrowedBook.rejected,
  (state) => {

    state.actionInProgress =
      null;

  }
)
  },
});

export default borrowSlice.reducer;