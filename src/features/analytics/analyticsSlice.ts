import {
  createSlice,
} from "@reduxjs/toolkit";

import {
  fetchAnalytics,
} from "./analyticsThunk";

interface AnalyticsState {

  loading: boolean;

  analytics: any;

  recentBooks: any[];

  favouriteBooksList: any[];
}

const initialState: AnalyticsState = {

  loading: false,

  analytics: null,

  recentBooks: [],

  favouriteBooksList: [],
};

const analyticsSlice =
  createSlice({

    name: "analytics",

    initialState,

    reducers: {},

    extraReducers: (builder) => {

      builder

        // PENDING

        .addCase(
          fetchAnalytics.pending,
          (state) => {

            state.loading = true;
          }
        )

        // SUCCESS

       .addCase(
  fetchAnalytics.fulfilled,
  (state, action) => {

    state.loading = false;

    state.analytics = {
      stats: action.payload.stats,
    };

    state.recentBooks =
      action.payload.recentBooks;

    state.favouriteBooksList =
      action.payload.favoriteBooksList;
  }
)

        // FAILED

        .addCase(
          fetchAnalytics.rejected,
          (state) => {

            state.loading = false;
          }
        );
    },
  });

export default analyticsSlice.reducer;