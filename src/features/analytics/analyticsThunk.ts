import { createAsyncThunk }
from "@reduxjs/toolkit";

import API from "../../api/axios";

export const fetchAnalytics =
  createAsyncThunk(

    "analytics/fetch",

    async () => {

      const res =
        await API.get(
          "/analytics/dashboard"
        );

      return res.data;
    }
  );