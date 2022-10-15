import { createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";
import TokenService from "../../api/token.service";

export const loginAction = createAsyncThunk(
  "auth/login-user",
  async ({ email, password }, thunkApi) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      TokenService.setUser(res.data);
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(
        e.response.data.message ?? "Internal Error"
      );
    }
  }
);

export const registerAction = createAsyncThunk(
  "auth/register-user",
  async (body, thunkApi) => {
    try {
      await API.post("/auth/register", body);
      return body.email;
    } catch (e) {
      return thunkApi.rejectWithValue(
        e.response.data.message ?? "Internal Error"
      );
    }
  }
);
