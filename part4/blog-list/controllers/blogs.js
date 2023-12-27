const app = require("express").Router()
const Bloglist = require("../models/blogSchema")

app.get('/', (request, response) => {
    Bloglist
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})
  
app.get('/:id', (request, response,next) => {
    Bloglist.findById(request.params.id).then(result => {
        if (result) {
            response.send(result);
        } else {
            response.status(404).send({error: `${request.params.id} not found`})
        }
    }).catch(e => {
        next(e)
    })
})

  
  app.post('/', (request, response) => {
    const blog = new Bloglist(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  

module.exports = app;