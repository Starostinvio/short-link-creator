import { asyncThunkCreator, createAsyncThunk } from "@reduxjs/toolkit";
import { ShortLinkInfo } from "../../types";

export type GetShortLinkParam = {
  url: string | "";
  token: string | "";
};

export const getShortLink = createAsyncThunk<ShortLinkInfo, GetShortLinkParam>(
  "shortLink/get",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://front-test.hex.team/api/squeeze?link=${url}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      return (await response.json()) as ShortLinkInfo;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
