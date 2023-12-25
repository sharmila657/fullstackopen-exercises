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
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
        type: String,
        validate: {
          validator: function(v) {
            return /^\d{2}-\d{7}$|^\d{3}-\d{8}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
      }
    });
 

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


app.get('/api/persons', (resuest, response) => {
  Person.find({}).then((result) => {
    response.json(result) 
  })
}) 

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(result => {
    if (result) {
        response.send(result);
    } else {
      response.status(404).send({ error: `${request.params.id} not found` })
    }
  }).catch(e => {
    next(e)
  })
})



const presentDate = new Date();
app.get('/info',async(request, response) => {
const personCount = await Person.countDocuments({});
  
response.send(
      `<p>Database has info for ${personCount} people <br> ${presentDate} </br> </p>`
  )
})

app.put('/api/persons/:id', (request, response, next) => {
  const newPerson = request.body

  const person = {
    name: newPerson.name,
    number: newPerson.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
})
  
app.post('/api/persons', (request, response, next) => {
  // console.log(request,"???")
  const newperson = request.body
  const person = new Person({
    name: newperson.name,
    number: newperson.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(e => {
    next(e)
    })
})
 
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

app.listen(process.env.PORT)
console.log(`Server running on port ${process.env.PORT}`)