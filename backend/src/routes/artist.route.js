const express =require('express')
const router = express.Router()
const artistController = require('../controllers/artist.controller')
const multer = require('multer')

const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/uploadMusic', upload.single("song"), artistController.createSong)


module.exports = router
