const Chat = require("../../Models/chatModel");
const Message = require("../../Models/messageModel");
const cloudinary = require("../../Config/cloudinary");
exports.sendMessage = async(req,res)=>{
    try{
        const {chatId} = req.params;
        const {content, messageType, receiverId} = req.body;
        const senderId = req.user._id;
        let msg = content;
        const chat = await Chat.findById(chatId);
        if(!chat) return res.status(404).json({message: "chat not found"});

        if(req.files && req.files.media){
            const file = req.files.media;
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "convoHubMessages",
                resource_type: "auto" 
            })

            msg = result.secure_url;
        }

        const message = new Message({sender: senderId,receiver: receiverId, messageType: messageType, content: msg});
        await message.save();
        chat.messages.push(message._id);
        chat.lastMessage = message._id;
        await chat.save();

        res.status(201).json(message);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "server error"})
    }
}