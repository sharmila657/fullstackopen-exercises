const app = require("express").Router()
const Bloglist = require("../models/blogSchema")
const User = require('../models/user')
const jwt = require('jsonwebtoken')


app.get('/', async(request, response) => {
    const blogs = await Bloglist
      .find({}).populate("user",{username:1, name: 1})
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
   
    // if (!blog.title || !blog.url) {
    //   response.status(400).json({error:"missing property"}).end()
    // }
    
    try {
      const bloguser = await User.findById(request.user);
      const blog = new Bloglist({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: request.user,
      });
      
      // if (blog.likes === undefined) {
      //   blog.likes = 0;
      // }
      const result = await blog.save();
      // console.log(bloguser)
      bloguser.Blog = bloguser.Blog.concat(result._id)
      await bloguser.save()
      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  })
 
app.delete('/:id', async (request, response,next) => {
  try {
    const user = request.user;
    const blog = await Bloglist.findById(request.params.id);
    if (blog.user.toString() === user.id.toString()) {
      await Bloglist.findByIdAndRemove(request.params.id);
      response.status(204).send("Blog deleted");
    } else {
      response.status(401).send("Unauthorized deletion tried");
    }
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