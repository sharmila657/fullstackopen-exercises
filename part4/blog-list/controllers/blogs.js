const app = require("express").Router()
const Bloglist = require("../models/blogSchema")

app.get('/', (request, response) => {
    Bloglist
      .find({})
      .then(blogs => {
        response.json(blogs)
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