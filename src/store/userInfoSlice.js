import { createSlice } from "@reduxjs/toolkit";
const initState = {
  id: "",
  name: "",
  email: "",
  accessToken: "",
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
    },
  },
});

export const { addUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
