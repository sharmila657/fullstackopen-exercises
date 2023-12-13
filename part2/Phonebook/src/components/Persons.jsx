const Persons = ({ filteredPersons,handleDelete}) => (
  <ul>
    {filteredPersons.map((person, id) => (
      <li key={id}>
        {person.name} - {person.number}
        <button onClick={()=>handleDelete(person.id)}>delete</button>
      </li>
    ))}
  </ul>
);
  
  export default Persons;