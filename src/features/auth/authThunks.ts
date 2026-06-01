import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";
import type { LoginForm, LoginResponse,RegisterForm,RegisterResponse } from "./authTypes";

export const registerUser =
  createAsyncThunk<
    RegisterResponse,
    RegisterForm,
    { rejectValue: string }
  >(
    "auth/register",

    async (data, thunkAPI) => {

      try {

        const res =
          await API.post<
            RegisterResponse
          >(
            "/auth/register",
            data
          );

        console.log("register:",res.data);
          localStorage.setItem(
        "token",
        res.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        res.data.refreshToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
        return res.data;

      } catch (error: any) {

        return thunkAPI.rejectWithValue(
          error?.response?.data?.message ||
          "Registration failed"
        );

      }
    }
  );

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginForm,
  { rejectValue: string }
>(
  "auth/login",

  async (data, thunkAPI) => {
    try {
      const res = await API.post<LoginResponse>(
        "/auth/login",
        data
      );

      localStorage.setItem(
        "token",
        res.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        res.data.refreshToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
        "Login failed"
      );
    }
  }
);