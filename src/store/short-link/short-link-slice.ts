import { createSlice } from "@reduxjs/toolkit";
import { getShortLink } from "./short-link-actions";
import { Status } from "../../types";
import { ShortLinkInfo } from "../../types";

type ShortLinkSlice = {
  shortLink: ShortLinkInfo | null;
  status: Status;
  error: string | undefined;
};

const initialState: ShortLinkSlice = {
  shortLink: null,
  status: "idle",
  error: "",
};

const shortLinkSlice = createSlice({
  name: "@shortLink",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShortLink.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getShortLink.fulfilled, (state, action) => {
        state.status = "received";
        console.log("short-link-slice action.payload", action.payload);
        state.shortLink = action.payload;
        return;
      })
      .addCase(getShortLink.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default shortLinkSlice.reducer;
