import { useDispatch } from "react-redux";
import { anecdoteFilterFrom } from "../reducers/anecdoteReducer";

const FilterAnecdote = () => {
  const dispatch = useDispatch();
  const filterAnecdotes = (event) => {
    dispatch(anecdoteFilterFrom(event.target.value));
  };
  return (
    <>
      filter{" "}
      <input type="text" name="inputToFilter" onChange={filterAnecdotes} />
    </>
  );
};

export default FilterAnecdote;