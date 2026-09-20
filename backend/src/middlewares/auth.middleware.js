const jwt = require("jsonwebtoken")

async function authArtist(req,res,next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        
        if(decodedToken.role !== "artist"){
            return res.status(403).json({message:"Forbidden: Only artists can create songs"})
        }
        req.user = decodedToken
    }
    catch(error){
        return res.status(401).json({message:"Invalid token"})
    }
    next()
}

async function authUser(req,res,next){
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        if (decodedToken.role !== "user" && decodedToken.role !== "artist") {
            return res.status(403).json({message:"Forbidden: Only users and artists can create songs"})
        }
        req.user = decodedToken
    }
    catch(error){
        return res.status(401).json({message:"Invalid token"})
    }
    next()
}

module.exports = {authArtist,authUser}