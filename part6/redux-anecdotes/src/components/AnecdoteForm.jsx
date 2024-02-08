import { useDispatch } from "react-redux";
import { newAnecdoteOf } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newAnecdoteOf(e.target.newAnecdote.value));
    e.target.newAnecdote.value = "";
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;