import { createSlice } from "@reduxjs/toolkit"
import { getAnecdotes, createAnecdote } from "../services/anecdotes";

const anecdoteReducer = createSlice({
  name: "anecdotes",
  initialState:[],
  reducers: {
    upVote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1}
          : anecdote
      );
    },
    newAnecdote(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});
export const initializeAnecdote = () => {
  return async (dispatch) => {
    const notes = await getAnecdotes();
    dispatch(setAnecdotes(notes))
  }
}
  export const addAnecdotes = (anecdotetoAdd) => {
    return async (dispatch) => {
      const addedAnecdotes = await createAnecdote(anecdotetoAdd)
      dispatch(newAnecdote(addedAnecdotes))
    }
  
}
    
export const { upVote, newAnecdote,setAnecdotes} = anecdoteReducer.actions;
export default anecdoteReducer.reducer;