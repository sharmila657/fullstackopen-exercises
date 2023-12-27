const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { url, PORT } = require('./utils/config')
const {info} = require('./utils/logger')


const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Bloglist = mongoose.model('Blog', blogSchema)

mongoose.connect(url)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Bloglist
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Bloglist(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`,"logging from index")
})