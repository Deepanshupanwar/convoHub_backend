const Chat  = require("../../Models/chatModel");

exports.createChat = async(req,res)=>{
    try{
        const {recipientId} = req.body;
        const senderId = req.user._id;
        let chat  = await Chat.findOne({participants: {$all : [senderId,recipientId]}});

        if(!chat){
            chat = new Chat({participants: [senderId,recipientId]});
            chat.save();
        }

        res.status(200).json(chat);
        
    }
    catch(err){
        res.status(500).json({message:"server error"});
    }
}