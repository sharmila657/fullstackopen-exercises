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
  const [notification, setNotification] = useState('');

  useEffect(() => {
    personsServices.getAll()
      .then((result) => {
      setPersons(result)
      })
    .catch (error => {
  showErrorNotification('Error fetching data from server');
  console.error('Error fetching data',error)
    })
    },
    []);
  
  const showSuccessNotification = (message) => {
    setNotification({ type: 'success', message });
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  }

  const showErrorNotification = (message) => {
    setNotification({ type: 'error', message });
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  }


  const addNote = (event) => {
    event.preventDefault();

    // if (persons.some(person => person.name === newName)) {
    // //   alert(`${newName} is already added to the phonebook.`);
    // showErrorNotification(`${newName} is already added to the phonebook.`)
  
    // }

    let newPerson = { name: newName, number: newVal };
    personsServices.create(newPerson)
      .then((result) => {
        setPersons([...persons, result.data])
        showSuccessNotification(`${newPerson.name} added to the phonebook.`)
      })
      .catch(error => {
        showErrorNotification(error.response.data.error)
      })
    
    
    const existingPerson = persons.find((person) => person.name === newName);

  if (existingPerson) {
    const confirmUpdate = window.confirm(
      `${newName} is already added to the phonebook. Replace the old number with the new one?`
    );

    if (confirmUpdate) {
      const updatedPerson = { ...existingPerson, number: newVal };

      personsServices
        .update(existingPerson.id, updatedPerson)
        .then((updatedPerson) => {
          setPersons(persons.map((person) => (person.id !== updatedPerson.id ? person : updatedPerson)));
          showSuccessNotification(`${updatedPerson.name}'s number updated successfully'`)

        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            showErrorNotification(`${updatedPerson.name} not found.`)
          } else {
            showErrorNotification('Error deleting person')
          }
          console.error('Error updating person:', error);
        });
    }
  } else {
     newPerson = { name: newName, number: newVal };
  }
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
          showSuccessNotification(`${personToDelete.name} deleted from Phonebook.`)
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            showErrorNotification(`${personToDelete.name} not found.`)
          } else {
            showErrorNotification('Error deleting person')
          }
          console.error('Error deleting person:', error);
        });
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>

      {notification && (
        <div style={{ color: notification.type === 'error' ? 'red' : 'green', border: '1px solid', padding: '10px', marginBottom: '10px' }}>
          {notification.message}
        </div>
      )}
      

      <Filter handleSearch={handleSearch}/>
      
      <h3>Add a new</h3>

      <PersonForm
        addNote={addNote}
        newName={newName}
        handleAddNote={handleAddNote}
        newVal={newVal}
        handleNewVal={handleNewVal}
      />

      <h3>Numbers</h3>

      <Persons
        filteredPersons={filteredPersons}
        handleDelete={handleDelete}
/>
    </div>
  )
}

export default App;
