const User = require("../../Models/userModels");
const Chat = require("../../Models/chatModel");
exports.accept = async (req, res) => {
    try {
        const receiverId = req.user._id;
        const senderId = req.params.senderId;

        const receiver = await User.findById(receiverId);
        const sender = await User.findById(senderId);

        if (!sender) return res.status(404).json({ message: "user not found" });
        if (!receiver.requestsReceived.includes(senderId)) return res.status(400).json({ message: "no request found" });

        sender.requestsSent = sender.requestsSent.filter(id => id.toString() !== receiver._id.toString());
        receiver.requestsReceived = receiver.requestsReceived.filter(id => id.toString() !== senderId);

        receiver.connections.push(senderId);
        sender.connections.push(receiverId);

        await sender.save();
        await receiver.save();

        let chat = await Chat.findOne({ participants: { $all: [senderId, receiverId] } });

        if (!chat) {
            chat = new Chat({ participants: [senderId, receiverId] });
            await chat.save();
            chat = await Chat.findById(chat._id).populate("participants", "name email profilePic").populate("lastMessage").populate("messages");
        }
        const user = await User.findById(receiverId).populate("requestsReceived", "name email profilePic").populate("connections", "name email profilePic");
        res.status(200).json({ message: "connection accepted", user, chat });
    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
}