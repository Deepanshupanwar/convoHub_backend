const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, // For one-on-one chats
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },  // For group chats
    messageType: { type: String, enum: ["text", "image", "video", "file", "audio"], default: "text" },
    content: { type: String, required: true }, // Message text or URL for media
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
