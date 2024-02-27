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
  reducers: {
    clearShortLink: (state) => {
      return {
        ...state,
        shortLink: null,
        status: "idle",
        error: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShortLink.pending, (state, action) => {
        return {
          ...state,
          status: "loading",
        };
      })
      .addCase(getShortLink.fulfilled, (state, action) => {
        return {
          ...state,
          status: "received",
          shortLink: action.payload,
        };
      })
      .addCase(getShortLink.rejected, (state, action) => {
        return {
          ...state,
          status: "rejected",
          error: action.error.message,
        };
      });
  },
});
export const { clearShortLink } = shortLinkSlice.actions;
export default shortLinkSlice.reducer;
