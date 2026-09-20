const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const artistRoutes = require('./routes/artist.route')
const getMusicRoutes = require('./routes/getSong.route')
const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/artist',artistRoutes)
app.use('/api/getMusic',getMusicRoutes)


module.exports = app