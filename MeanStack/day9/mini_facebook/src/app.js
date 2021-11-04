const express = require('express')
const app = express()
const userRoutes = require('../routes/user.route')
const postRoutes = require('../routes/post.route')
require('dotenv').config()
require('../models/db/connection')
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/user', userRoutes)
app.use('/post', postRoutes)

module.exports = app