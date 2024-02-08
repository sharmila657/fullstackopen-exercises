import { useSelector, useDispatch } from 'react-redux'
import { upVoteOf, newAnecdoteOf} from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(upVoteOf(id));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.newAnecdote.value);
    dispatch(newAnecdoteOf(e.target.newAnecdote.value));
    e.target.newAnecdote.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
      .sort((a,b)=>b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="newAnecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App