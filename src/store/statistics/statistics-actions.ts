import { createAsyncThunk } from "@reduxjs/toolkit";
import { ShortLinkInfo } from "../../types";
import { DataLinksInfo } from "../../types";

type GetSortListSlice = {
  limit: number;
  offset: number;
  order?: string;
  token: string;
};

export const getSortList = createAsyncThunk<DataLinksInfo, GetSortListSlice>(
  "sortList/get",
  async ({ limit, offset, order, token }, { rejectWithValue }) => {
    const endpointDefault = `offset=${offset}&limit=${limit}`;
    const endpointSort = `order=${order}&offset=${offset}&limit=${limit}`;
    try {
      const response = await fetch(
        `https://front-test.hex.team/api/statistics?${
          order ? endpointSort : endpointDefault
        }`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const data: DataLinksInfo = {
        list: [],
        totalCount: null,
      };

      data.list = (await response.json()) as ShortLinkInfo[];
      data.totalCount = response.headers.get("X-Total-Count");
      return data;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
