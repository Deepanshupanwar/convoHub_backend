const User = require("../../Models/userModels");

exports.send = async (req,res)=>{
    try{
    const senderID = req.user._id;
    const receiverId = req.params.receiverId;

    const receiver = await User.findById(receiverId);
    const sender = await User.findById(senderID);

    if(!receiver) return res.status(404).json({message: "user not found"});
    if(receiver.requestsReceived.includes(senderID)) return res.status(400).json({message: "request already sent"})

    receiver.requestsReceived.push(senderID);
    sender.requestsSent.push(receiverId);
    await sender.save();
    await receiver.save();

    res.status(200).json({message: "request sended successfully"});
    }catch(err){
        res.status(500).json({message: "server error"});
    }

}