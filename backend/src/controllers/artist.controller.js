const artistModel = require("../models/artist.model")
const jwt = require("jsonwebtoken")
const uploadFile = require("../services/storage.service")


async function createSong(req,res){

const token = req.cookies.token
if(!token){
    return res.status(401).json({message:"Unauthorized"})
}

try {
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
if (decodedToken.role !== "artist"){
    return res.status(403).json({message:"Forbidden: Only artists can create songs"})
}


    const title = req.body.title
    const file = req.file

    const result = await uploadFile(file)

    const song = await artistModel.create({
        uri: result.url,
        title,
        artist: decodedToken.Id
    })
    res.status(201).json({message:"Song created successfully",song:{
        id:song._id,
        uri:song.uri,
        title:song.title,
        artist:song.artist
    }
})

}catch(error){
    return res.status(401).json({message:"Invalid token"})
}
}

module.exports = {createSong}
