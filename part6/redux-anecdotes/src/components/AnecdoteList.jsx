import { useSelector,useDispatch } from "react-redux";
import { upVoteOf } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const filters = useSelector(state => state.filter)
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(upVoteOf(id));
    }

    const ShowAnecdote = filters
    ? anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filters.toLowerCase())
      )
    : anecdotes;

  ShowAnecdote.sort((a, b) => b.votes - a.votes);

    return (
        <>
        {ShowAnecdote.map(anecdote =>
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
        </>
    )
}

export default AnecdoteList