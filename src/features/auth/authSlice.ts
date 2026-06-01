import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser} from "./authThunks";
import type { AuthState } from "./authTypes";

const token = localStorage.getItem("token");
// console.log("token");

const userString = localStorage.getItem("user");
// console.log("user:",userString);
let user = null;

try {
  user =
    userString &&
    userString !== "undefined"
      ? JSON.parse(userString)
      : null;
} catch {
  user = null;
}

const initialState: AuthState = {
  token,
  isAuthenticated: !!token,
  user,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.token =
          action.payload.accessToken;

        state.user =
          action.payload.user;

        state.isAuthenticated = true;

        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Login failed";

        state.isAuthenticated = false;
      })
      .addCase(
  registerUser.pending,
  (state) => {

    state.loading = true;

    state.error = null;

  }
)

.addCase(
  registerUser.fulfilled,
  (state, action) => {
        state.loading = false;

        state.token =
          action.payload.accessToken;

        state.user =
          action.payload.user;

        state.isAuthenticated = true;

        state.error = null;
  }
)

.addCase(
  registerUser.rejected,
  (state, action) => {

    state.loading = false;

    state.error =
      action.payload ||
      "Registration failed";

  }
);
  },
});

export const { logout } =
  authSlice.actions;

export default authSlice.reducer;