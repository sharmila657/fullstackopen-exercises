import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList"
import FilterAnecdote from "./components/FilterAnecdote";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterAnecdote />
      <AnecdoteList />
      <AnecdoteForm />
      <Notification/>   
    </div>
  )
}

export default App