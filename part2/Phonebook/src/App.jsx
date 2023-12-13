
import { useState, useEffect } from "react";
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')

  const [newVal, setNewVal] = useState('')
  const [searchVal, setSearchVal] = useState('')

  useEffect(() => {
    personsServices.getAll()
      .then((result) => {
      setPersons(result)
    })
    },
   []);


  const addNote = (event) => {
    event.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`);
  
    }

    const newPerson = { name: newName, number: newVal };

    personsServices.create(newPerson)
      .then((result) => {
      setPersons([...persons,result.data])
      })
    
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

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    const confirmDeletion = window.confirm(`Delete ${personToDelete.name}?`);

    if (confirmDeletion) {
      personsServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting person:', error);
        });
    }
  };


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

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App;
