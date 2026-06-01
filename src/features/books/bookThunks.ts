import { createAsyncThunk } from "@reduxjs/toolkit";

import API from "../../api/axios";

export const addBook = createAsyncThunk(
  "books/addBook",

  async (formData: FormData, thunkAPI) => {
    try {
      const res = await API.post(
        "/books/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("add :",res.data);

      return res.data;
    } catch (error: any) {
      return({
        success:false,
        message:"Internal Server error !"
      })
    }
  }
);

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",

  async (id: string, thunkAPI) => {
    try {
      const res = await API.get(
        `/books/${id}`
      );

      return res.data.book;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",

  async (
    {
      id,
      formData,
    }: {
      id: string;
      formData: FormData;
    },
    thunkAPI
  ) => {
    try {
      const res = await API.patch(
        `/books/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message
      );
    }
  }
);

export const fetchBooks =
  createAsyncThunk(
    "books/fetchBooks",

    async ({
      page = 1,
      limit = 10,
      search = "",
      genre = "",
      status = "",
      minRating = "",
      minYear = "",
      maxYear = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    }: {
      page?: number;
      limit?: number;
      search?: string;
      genre?: string;
      status?: string;
      minRating?: string;
      minYear?: string;
      maxYear?: string;
      sortBy?: string;
      sortOrder?: string;
    }) => {

      const res = await API.get(
        `/books?page=${page}&limit=${limit}&search=${search}&genre=${genre}&status=${status}&minRating=${minRating}&minYear=${minYear}&maxYear=${maxYear}&sortBy=${sortBy}&sortOrder=${sortOrder}`);

      return res.data;
    }
  );

export const borrowBook =
  createAsyncThunk(

    "books/borrowBook",

    async (id: string) => {

      const res =
        await API.post(
          `/borrow/${id}`
        );

      return {
        ...res.data,
        id,
      };
    }
  );

export const returnBook =
  createAsyncThunk(

    "books/returnBook",

    async (id: string) => {

      const res =
        await API.post(
          `/borrow/return/${id}`
        );

      return {
        ...res.data,
        id,
      };
    }
  );

export const deleteBook =
  createAsyncThunk(
    "books/deleteBook",

    async (id: string, thunkAPI) => {
      try {
        const res = await API.delete(`/books/${id}`);

        return {
          id,
          ...res.data,
        };
      } catch (error: any) {
        console.log("err :",error);
        return(
          {
          success:false,
          message:"Internal server error"
          }
        );
      }
    }
  );

  export const toggleFavorite =
  createAsyncThunk(

    "books/toggleFavorite",

    async (id: string) => {

      const res =
        await API.post(
          `/books/${id}/favorite`
        );

      return {
        id,
        ...res.data,
      };
    }
  );

  