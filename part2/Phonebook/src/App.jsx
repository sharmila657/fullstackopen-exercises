import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNote = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`);
      return;
    }

    const newPerson = { name: newName };
    setPersons([...persons, newPerson]);
    setNewName("")
  }

  const handleAddNote = (event) => {
    setNewName(event.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input value = {newName} onChange={handleAddNote} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((all,id) => (
          <li key={id}>{all.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App