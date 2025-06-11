const Group = require('../../Models/groupModel');
const Message = require('../../Models/messageModel');
const cloudinary = require("../../Config/cloudinary");

exports.sendMessage = async (req, res) => {
    try {
        const senderId = req.user._id;
        const { content, messageType } = req.body;
        const { groupId } = req.params;
        let msg = content;

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "group not found" });

        if (req.files && req.files.media) {
            const file = req.files.media;

            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "convoHubMessages",
                resource_type: "auto"
            });

            msg = result.secure_url;
        }

        const message = new Message({
            sender: senderId,
            content: msg,
            messageType,
            group: groupId
        });

        await message.save();

        const populatedMessage = await Message.findById(message._id).populate("sender", "name _id profilePic");

        group.messages.push(message._id);
        group.lastMessage = message._id;
        await group.save();

        res.status(201).json(populatedMessage);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" });
    }
};
