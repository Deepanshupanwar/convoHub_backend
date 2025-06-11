const Group = require('../../Models/groupModel');
const Message = require('../../Models/messageModel');

exports.getMessages = async (req,res)=>{
    try{
        const userId  = req.user._id;
        const {groupId} = req.params;
        const group = await Group.findById(groupId).populate("messages");

        if(!group.members.includes(userId)) return res.status(403).json({message: "Access denied! You are not part of this chat"});

        if(!group) return res.status(404).json({message: "group not found"});

        res.status(201).json(group);
    }
    catch(err){
        res.status(500).json({message: "serevr error"});
    }
}