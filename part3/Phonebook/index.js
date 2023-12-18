const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)