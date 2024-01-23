const app = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

app.get('/', async(request, response) => {
    const users = await User
      .find({}).populate("Blog",{title:1,author:1});
     response.json(users)
})
  
app.get('/:id', (request, response,next) => {
    User.findById(request.params.id).then(result => {
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
    const { username, name, password } = request.body
    
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(password, saltRounds)
    
      const user = new User({
        username,
        name,
        passwordHash,
      })
    
    try {
      const savedUser = await user.save();
      // console.log(savedUser,"saveduser")
      response.status(201).json(savedUser)
    }
    catch (e) {
      next(e)
    }
  })
 
module.exports = app;