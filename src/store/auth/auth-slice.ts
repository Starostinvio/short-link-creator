import { ReducerType, createSlice } from "@reduxjs/toolkit";
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "received";
        return state;
      })
      .addCase(signUp.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.tokenDate.access_token);
        localStorage.setItem("username", action.payload.username);
        state.token = action.payload.tokenDate.access_token;
        state.user = { username: action.payload.username };
        state.exists = true;
        state.status = "received";
        return state;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(remindSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(remindSession.fulfilled, (state, action) => {
        state.user = { username: localStorage.getItem("username") };
        state.token = action.payload;
        state.exists = true;
        return;
      })
      .addCase(remindSession.rejected, (state, action) => {
        state.status = "rejected";
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        state.user = {};
        state.token = null;
        state.exists = false;
        state.error = action.error.message;
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
