const Group = require("../../Models/groupModel");

exports.getGroupChats = async (req,res)=>{
    try{
        const userId = req.user._id;
        const groups = await Group.find({members: userId}).populate("lastMessage").populate("members", "name email profilePic").populate("messages").populate("admins", "name email profilePic").populate({
    path: "messages",
    populate: {
      path: "sender",
      model: "user", 
      select: "name _id", 
    },
  });
        res.status(200).json(groups)
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "server error"});
    }
}