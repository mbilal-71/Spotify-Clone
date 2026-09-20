const express =require('express')
const router = express.Router()
const getMusicController = require('../controllers/getMusic.controller')
const {authUser} = require('../middlewares/auth.middleware')


router.get('/',authUser,getMusicController.getAllSongs)
router.get('/albums',authUser,getMusicController.getAllAlbums)
router.get('/albums/:id',authUser,getMusicController.getAlbumById)

module.exports = router