import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types";
import { Token } from "../../types";

export interface UserDate {
  username: string;
  password: string;
}

type UserSessionDate = {
  tokenDate: Token;
  username: string;
};

export const signUp = createAsyncThunk<User, UserDate>(
  "auth/signUp",
  async ({ username, password }: UserDate, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://front-test.hex.team/api/register?username=${username}&password=${password}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      data.password = password;
      return data;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

export const login = createAsyncThunk<UserSessionDate, UserDate>(
  "auth/login",
  async ({ username, password }: UserDate, { rejectWithValue }) => {
    try {
      const response = await fetch("https://front-test.hex.team/api/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        rejectWithValue("Error");
      }
      const userSessionDate: UserSessionDate = {
        tokenDate: {
          access_token: "",
          token_type: "",
        },
        username: "",
      };
      userSessionDate.tokenDate = await response.json();
      userSessionDate.username = username;

      return userSessionDate;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);

export const remindSession = createAsyncThunk(
  "auth/remindSession",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch(
          "https://front-test.hex.team/api/statistics?offset=0&limit=0",
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

        return token;
      }

      throw new Error("Access token is missing");
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue("Unknown error");
    }
  }
);
