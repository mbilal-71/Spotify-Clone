const {ImageKit} = require("@imagekit/nodejs")

const imagekitClient = new ImageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
   
})

async function uploadFile(file){
const result = await imagekitClient.files.upload({
    file : file.buffer.toString("base64"),
    fileName : "song" + Date.now(),
    folder: "songs_uploads"
})
return result
}

module.exports = uploadFile