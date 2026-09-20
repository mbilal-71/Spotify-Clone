const songModel = require("../models/artist.model")
const albumModel = require("../models/album.model")

async function getAllSongs(req,res){
    const songs = await songModel
    .find()
    .skip(1)
    .limit(5)
    .populate("artist","username")
    res.status(200).json({message:"Songs fetched successfully",songs})
}

async function getAllAlbums(req,res){
    const albums = await albumModel
    .find()
    .limit(5)
    .populate("artist","username")
    res.status(200).json({message:"Albums fetched successfully",albums})
}

async function getAlbumById(req,res){
    const {id} = req.params
    const album = await albumModel
    .findById(id)
    .populate("artist","username")
    res.status(200).json({message:"Album fetched successfully",album})
}


module.exports = {getAllSongs,getAllAlbums,getAlbumById}