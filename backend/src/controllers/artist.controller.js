const songModel = require("../models/artist.model")
const jwt = require("jsonwebtoken")
const uploadFile = require("../services/storage.service")
const albumModel = require("../models/album.model")

async function createSong(req,res){

    const file = req.file
    const title = req.body.title
    

    const result = await uploadFile(file)

    const song = await songModel.create({
        uri: result.url,    
        title,
        artist: req.user.Id
    })
    res.status(201).json({message:"Song created successfully",song:{
        id:song._id,
        uri:song.uri,
        title:song.title,
        artist:song.artist
    }
})
}


async function createAlbum(req,res){


    const {title,songId} = req.body
    
    const album = await albumModel.create({
        title,
        songs: songId,
        artist: req.user.Id
    })
    res.status(201).json({message:"Album created successfully",album:{
        id:album._id,
        title:album.title,
        songs:album.songs,
        artist:album.artist
    }})

}


module.exports = {createSong,createAlbum}
