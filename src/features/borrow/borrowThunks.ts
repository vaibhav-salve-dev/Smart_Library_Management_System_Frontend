import { createAsyncThunk }
from "@reduxjs/toolkit";

import API from "../../api/axios";

export const fetchActiveBorrows =
  createAsyncThunk(

    "borrow/fetchActiveBorrows",

    async () => {

      const res =
        await API.get(
          "/borrow/active"
        );

      return res.data.borrows;
    }
  );

export const fetchBorrowHistory =
  createAsyncThunk(

    "borrow/fetchBorrowHistory",

    async () => {

      const res =
        await API.get(
          "/borrow/history/all"
        );

      return res.data.history;
    }
  );

  export const returnBorrowedBook =
  createAsyncThunk(

    "borrow/returnBorrowedBook",

    async (bookId: string) => {

      const res =
        await API.post(
          `/borrow/return/${bookId}`
        );

      return {
        bookId,
        ...res.data,
      };
    }
  );