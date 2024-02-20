import { createSlice } from "@reduxjs/toolkit";
  
const filterReducer = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    anecdoteFilterFrom(state, action) {
      return action.payload;
    },
  },
});
export const { anecdoteFilterFrom } = filterReducer.actions;
export default filterReducer.reducer;