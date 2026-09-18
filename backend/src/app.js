const express = require('express')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const authRoutes = require('./routes/auth.routes')
const artistRoutes = require('./routes/artist.route')
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/artist',artistRoutes)


module.exports = app