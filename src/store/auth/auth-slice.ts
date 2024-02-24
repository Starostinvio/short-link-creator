import { createSlice } from "@reduxjs/toolkit";
import { signUp, login } from "./auth-actions";
import { Status } from "../../types";
import { User } from "../../types";
import { remindSession } from "./auth-actions";

type AuthSlice = {
  user: User | {};
  token: string | null;
  status: Status;
  exists: boolean | null;
  error: string | undefined;
};

const initialState: AuthSlice = {
  user: {},
  token: null,
  status: "idle",
  exists: null,
  error: undefined,
};

const authSlice = createSlice({
  name: "@auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("token");
      return {
        user: {},
        token: null,
        status: "idle",
        exists: false,
        error: undefined,
      };
    },
    clearError: (state) => {
      return { ...state, error: undefined, status: "idle" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        return {
          ...state,
          status: "loading",
        };
      })
      .addCase(signUp.fulfilled, (state, action) => {
        return {
          ...state,
          user: action.payload,
          status: "received",
        };
      })
      .addCase(signUp.rejected, (state, action) => {
        return {
          ...state,
          error: action.payload as string,
          status: "rejected",
        };
      })
      .addCase(login.pending, (state) => {
        return {
          ...state,
          status: "loading",
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("action payload", action.payload);
        if (action.payload.tokenDate.access_token) {
          localStorage.setItem("token", action.payload.tokenDate.access_token);
          localStorage.setItem("username", action.payload.username);

          return {
            ...state,
            token: action.payload.tokenDate.access_token,
            user: { username: action.payload.username },
            exists: true,
            status: "received",
          };
        }

        return {
          ...state,
          token: null,
          exists: false,
          status: "rejected",
        };
      })
      .addCase(login.rejected, (state, action) => {
        return {
          ...state,
          status: "rejected",
          error: action.payload as string,
        };
      })
      .addCase(remindSession.pending, (state) => {
        return {
          ...state,
          status: "loading",
        };
      })
      .addCase(remindSession.fulfilled, (state, action) => {
        return {
          ...state,
          user: { username: localStorage.getItem("username") },
          token: action.payload,
          exists: true,
        };
      })
      .addCase(remindSession.rejected, (state, action) => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");

        return {
          ...state,
          status: "rejected",
          user: {},
          token: null,
          exists: false,
          error: action.error.message,
        };
      });
  },
});

export const { logOut, clearError } = authSlice.actions;

export default authSlice.reducer;
