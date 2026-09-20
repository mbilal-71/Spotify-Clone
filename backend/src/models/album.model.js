const mongoose = require("mongoose")

const albumSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    songs:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"song",
        required:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

const albumModel = mongoose.model("album",albumSchema)
module.exports = albumModel