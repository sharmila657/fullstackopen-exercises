import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: "041-123456"
    }
  ])
  const [newName, setNewName] = useState('')
  const [newVal, setNewVal] = useState('')
  const [searchVal, setSearchVal] = useState('')



  const addNote = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`);
  
     
    }

    const newPerson = { name: newName, number: newVal };
    setPersons([...persons, newPerson]);
    setNewName("")
    setNewVal('')

  }

  const handleAddNote = (event) => {
    setNewName(event.target.value)
  }

  const handleNewVal = (event) => {
    setNewVal(event.target.value)

  }

  const handleSearch = (event) => {
    setSearchVal(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchVal.toLowerCase())
  );


  return (
    <div>
      <h2>Phonebook</h2>

  
      <Filter handleSearch={handleSearch} />

      <h3>Add a new</h3>

      <PersonForm
        addNote={addNote}
        newName={newName}
        handleAddNote={handleAddNote}
        newVal={newVal}
        handleNewVal={handleNewVal}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App;