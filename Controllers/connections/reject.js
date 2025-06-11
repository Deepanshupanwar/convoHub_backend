const User = require("../../Models/userModels");

exports.reject = async (req,res)=>{
    try {
            const receiverId = req.user._id;
            const senderId = req.params.senderId;
    
            const receiver = await User.findById(receiverId);
            const sender = await User.findById(senderId);
    
            if (!sender) return res.status(404).json({ message: "user not found" });
            if (!receiver.requestsReceived.includes(senderId)) return res.status(400).json({ message: "no request found" });
    
            sender.requestsSent = sender.requestsSent.filter(id=> id.toString() !== receiver._id.toString());
            receiver.requestsReceived =  receiver.requestsReceived.filter(id=> id.toString()!== senderId);
    
    
            await sender.save();
            await receiver.save();

            const user = await User.findById(receiverId).populate("requestsReceived","name email profilePic").populate("connections","name email profilePic");
    
            res.status(200).json({ message: "connection rejected",user });
        } catch (err) {
            res.status(500).json({ message: "server error" });
        }
}