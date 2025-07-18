const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }], // Two users
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }], // Message IDs
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, // Last message
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
