const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { url } = require('./utils/config')
const blogController = require("./controllers/blogs")

mongoose.connect(url)

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogController)


module.exports = app;
