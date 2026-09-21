const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const artistRoutes = require('./routes/artist.route')
const getMusicRoutes = require('./routes/getSong.route')
const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
    credentials: true
}))
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({extended:true,limit:"50mb"}))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/artist',artistRoutes)
app.use('/api/getMusic',getMusicRoutes)


module.exports = app