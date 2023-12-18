const express = require('express')
const app = express()
const morgan = require("morgan")

app.use(express.json());

morgan.token('postData', (request, response) => JSON.stringify(request.body));

app.use(morgan('tiny'));

let persons = [
    
        { 
          "id": 1,
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": 2,
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": 3,
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": 4,
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]

const presentDate = new Date();
// console.log(presentDate);
const personCount = persons.length;

app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
  })

app.get('/api/persons', (resuest,response) => {
    response.json(persons)
}) 

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${personCount} people <br> ${presentDate} </br> </p>`
    )
})
app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);
    if (person) {
        response.send(person);
    } else {
        response.status(404).json({error:'Person not found'})
    }
})
app.delete("/api/persons/:id", (request, response) => {  
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);
    if (persons) {
        response.status(204).end();
    } else {
    response.status(404).json({error:'Person not found'})
    }
});
  
app.post('/api/persons', (request, response) => {
    const newPerson = request.body;
    if (!newPerson.name || !newPerson.number) {
        return response.status(400).json({ error: 'content missing' });
    }
    const nameExists = persons.some(entry => entry.name === newPerson.name);
    if (nameExists) {
      return response.status(400).json({ error: 'Name must be unique' });
    }
    newPerson.id = Math.floor(Math.random() * 1000000);
    response.json(newPerson);
    persons = [...persons, newPerson];
  });

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)