import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./auth.action";
const initialState = {
  loading: false,
  errorMsg: undefined,
  registrationSuccess: false,
  loggedIn: false,
  userDetails: {},
  registeredEmail: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clear: (state) => {
      state = {
        loading: false,
        errorMsg: undefined,
        registrationSuccess: false,
        loggedIn: false,
        userDetails: {},
        registeredEmail: "",
      };
      return state;
    },
    logout: (state) => {
      state.loggedIn = false;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.loginAction.pending, (state) => {
        state.loading = true;
        state.errorMsg = "";
      })
      .addCase(actions.loginAction.fulfilled, (state, action) => {
        state.userDetails = action.payload.user;
        state.loggedIn = true;
        state.loading = false;
        state.errorMsg = "";
      })
      .addCase(actions.loginAction.rejected, (state, action) => {
        const { payload } = action;
        state.loading = false;
        state.errorMsg = payload;
        console.log(action.payload);
      });
    //register action
    builder
      .addCase(actions.registerAction.pending, (state) => {
        state.loading = true;
        state.errorMsg = "";
      })
      .addCase(actions.registerAction.fulfilled, (state, action) => {
        state.registeredEmail = action.payload;
        state.registrationSuccess = true;
        state.loading = false;
        state.errorMsg = "";
      })
      .addCase(actions.registerAction.rejected, (state, action) => {
        const { payload } = action;
        state.loading = false;
        state.errorMsg = payload;
        console.log(action.payload);
      });
  },
});

export const authPage = AuthSlice.reducer;
export const { clear, logout } = AuthSlice.actions;
