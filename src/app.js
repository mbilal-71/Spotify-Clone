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

// Global error handler
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error("Multer error:", err.code, "field:", err.field)
        return res.status(400).json({ message: err.message, code: err.code, field: err.field })
    }
    console.error("Unhandled error:", err)
    res.status(500).json({ message: "Internal server error", error: err.message })
})

module.exports = app