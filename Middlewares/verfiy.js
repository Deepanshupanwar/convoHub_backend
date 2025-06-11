const jwt = require("jsonwebtoken");
const User = require("../Models/userModels");

exports.Verify = async (req,res,next)=>{
    try{
        const token = req.cookies["convoHub"];
        if(!token) return res.status(401).json({message: "Unauthorized"});
        jwt.verify(token,process.env.JWT_SECRET,async function(err, decoded){
            if(err){
                return res.status(401).json({message: "Unauthorized"});
            }
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }) 
    }
    catch(e){
        res.status(500).json({message: "server error"});
    }
}