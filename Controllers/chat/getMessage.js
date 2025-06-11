const Chat = require("../../Models/chatModel");
exports.getMessage = async(req,res)=>{
  try{  
        const {chatId} = req.params;
        const userId = req.user._id;
        const chat = await Chat.findById(chatId).populate("messages");
        
        if(!chat) return res.status(404).json({message: "chat not found"});
        if(!chat.participants.includes(userId)) return res.status(403).json({message: "Access denied! You are not part of this chat"});

        res.status(200).json(chat.messages);
  }catch(err){
        res.status(500).json({message: "server error"});
  }
   
}