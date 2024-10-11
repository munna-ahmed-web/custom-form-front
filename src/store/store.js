import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userInfoSlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
  },
});

export default store;
