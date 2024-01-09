const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { url } = require('./utils/config')
const blogController = require("./controllers/blogs")
const userController = require("./controllers/users")
const loginController = require("./controllers/login")


const { noHandler, errorHandler} = require("./utils/middleware")

mongoose.connect(url)

app.use(cors())
app.use(express.json())
// app.use("/api/blogs",blogController)
app.use("/api/blogs",blogController)
// app.use("/api/blogs",tokenExtractor,userExtractor,blogController)
app.use("/api/users", userController)
app.use("/api/login", loginController)



app.use(noHandler)
app.use(errorHandler)


module.exports = app;
