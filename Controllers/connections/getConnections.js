const User = require("../../Models/userModels")

exports.getConnections = async (req,res)=>{
    try{
            const user = await User.findById(req.user._id).populate("connections", "name email profilePic");
            res.json({ connections: user.connections });
    
        }
    catch(err){
            res.status(500).json({ message: "server error" });
    }
}