import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return user;
    },
  },
});

export const userObj = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user));
  };
};
export const { setUser } = userSlice.actions;
export default userSlice.reducer;