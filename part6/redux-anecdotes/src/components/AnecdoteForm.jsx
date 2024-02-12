import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";


const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(newAnecdote(event.target.newAnecdote.value));
    event.target.newAnecdote.value = "";
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