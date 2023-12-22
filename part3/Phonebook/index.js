const express = require('express')
const app = express()
const morgan = require("morgan")
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv").config();

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)
console.log(Person, "mongodb")

app.use(cors())
app.use(express.json());
app.use(express.static("dist"))
app.use(morgan('tiny'));

let persons = []

const presentDate = new Date();
// console.log(presentDate);
const personCount = persons.length;

app.get('/api/persons', (resuest, response) => {
  Person.find({}).then((result) => {
    response.json(result) 
  })
}) 

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${personCount} people <br> ${presentDate} </br> </p>`
    )
})
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(result => {
    if (result) {
        response.send(result);
    } else {
        response.status(404).send({error:'id not found'})
    }
    
  }).catch(e => {
    console.log(e)
    response.status(500).send()
  })
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

app.listen(process.env.PORT)
console.log(`Server running on port ${process.env.PORT}`)