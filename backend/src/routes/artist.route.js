const express =require('express')
const router = express.Router()
const artistController = require('../controllers/artist.controller')
const multer = require('multer')
const {authArtist} = require('../middlewares/auth.middleware')

const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/uploadMusic', authArtist, upload.single("song"), artistController.createSong)
router.post('/createAlbum', authArtist, artistController.createAlbum)


module.exports = router
