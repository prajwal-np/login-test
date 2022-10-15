import { combineReducers } from "redux";
import {configureStore} from "@reduxjs/toolkit"
import {authPage} from "./auth/auth.slice"
const reducer = combineReducers({
    authPage
  })

const store = configureStore({
    reducer,
    devTools: true,
});

export default store;
