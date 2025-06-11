const User = require("../../Models/userModels")
exports.searchUser = async (req,res)=>{
    try{
        const email  = req.params.email;
        const searchResult = await User.find({email}).select("name email profilePic");
        res.status(200).json(searchResult);
    }
    catch(err){
        res.status(500).json({message: "server error"})
    }
}