const User = require("../../Models/userModels")

exports.getRequests = async (req,res)=>{
    try{
        const user = await User.findById(req.user._id).populate("requestsReceived", "name email profilePic");
        res.json({ receivedRequests: user.requestsReceived });

    }
    catch(err){
        res.status(500).json({ message: "server error" });
    }
}