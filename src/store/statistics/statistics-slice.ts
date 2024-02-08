import { createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types";
import { getSortList } from "./statistics-actions";
import { DataLinksInfo } from "../../types";

type StatisticsSlice = {
  links: DataLinksInfo;
  status: Status;
  error: string | undefined;
};

const initialState: StatisticsSlice = {
  links: {
    list: [],
    totalCount: null,
  },
  status: "idle",
  error: undefined,
};

const statisticsSlice = createSlice({
  name: "@sort",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSortList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSortList.fulfilled, (state, action) => {
        state.status = "received";
        state.links = action.payload;
        return;
      })
      .addCase(getSortList.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default statisticsSlice.reducer;
