import { createSlice } from "@reduxjs/toolkit";
const initState = {
  id: "",
  name: "",
  email: "",
  accessToken: "",
  isAdmin: false,
};
const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initState,
  reducers: {
    addUserInfo: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.isAdmin = action.payload.isAdmin;
    },
    logOutInfo: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.accessToken = "";
      state.isAdmin = false;
    },
  },
});

export const { addUserInfo, logOutInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
