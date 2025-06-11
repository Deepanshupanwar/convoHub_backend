const Chat = require("../../Models/chatModel");
exports.getChats = async (req,res)=>{
    try{
        const userId = req.user._id;
        const chats = await Chat.find({participants: userId}).populate("participants", "name email profilePic").populate("lastMessage").populate("messages");
        res.status(200).json(chats);
    }catch(err){
        res.status(500).json({message: "internal server error"});
    }
}