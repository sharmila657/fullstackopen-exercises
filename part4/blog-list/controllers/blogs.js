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

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
  
  app.post('/', async(request, response,next) => {
   
    // if (!blog.title || !blog.url) {
    //   response.status(400).json({error:"missing property"}).end()
    // }
    
    try {
      const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
      if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
      }
      const bloguser = await User.findById(decodedToken.id)
      // const bloguser = await User.findById(request.body.userId);
      const blog = new Bloglist({
      title: request.body.title,
      author: request.body.author,
      url: request.body.author,
      likes: request.body.likes || 0,
      user: bloguser.id,
    });
      // if (blog.likes === undefined) {
      //   blog.likes = 0;
      // }
      const result = await blog.save();
      console.log(result)
      bloguser.Blog = bloguser.Blog.concat(result._id)
      await bloguser.save()
      response.status(201).json(result);
    } catch (error) {
      next(error);
    }
  })
 
app.delete('/:id', async (request, response,next) => {
  try { 
    await Bloglist.findByIdAndDelete(request.params.id)
    response.send().end()
    

    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    const blog = await Bloglist.findById(req.params.id);

    if (blog.user.toString() === user.id.toString()) {
      await Bloglist.findByIdAndRemove(req.params.id);
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