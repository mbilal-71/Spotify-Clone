const songModel = require("../models/artist.model")
const albumModel = require("../models/album.model")

async function getAllSongs(req,res){
    const songs = await songModel.find()
    res.status(200).json({message:"Songs fetched successfully",songs})
}

async function getAllAlbums(req,res){
    const albums = await albumModel.find().populate("songs","title uri").populate("artist","username")
    res.status(200).json({message:"Albums fetched successfully",albums})
}

module.exports = {getAllSongs,getAllAlbums}