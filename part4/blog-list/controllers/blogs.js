const app = require("express").Router()
const Bloglist = require("../models/blogSchema")
const middleware = require('../utils/middleware')

app.get('/', async(request, response) => {
    const blogs = await Bloglist
      .find({})
     response.json(blogs)
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

  
  app.post('/', async(request, response,next) => {
    const blog = new Bloglist(request.body)
    // if (blog.likes === undefined) {
    //   blog.likes = 0;
    // }
    if (!blog.title || !blog.url) {
      response.status(400).json({error:"missing property"}).end()
    }
  try {
      const result = await blog.save();
      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  })
 
app.delete('/:id', async (request, response,next) => {
  try { 
    await Bloglist.findByIdAndDelete(request.params.id)
    response.send().end()
    
  }
  catch (error) {
    next(error)
  }
})

app.put('/:id', async (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author || "",
    url: request.body.url,
    likes: request.body.likes || 0
  }
  try {
   const updatedBlog =  await Bloglist.findByIdAndUpdate(request.params.id,blog,{new:true})
    response.json(updatedBlog)
  }
  catch (error) {
    next(error)
  }
})


module.exports = app;