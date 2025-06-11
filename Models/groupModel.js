const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    groupPic: { type: String, default: "" }, 
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }],
    admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }], 
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }], 
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
}, { timestamps: true });

const Group = mongoose.model("Group", groupSchema);
module.exports = Group;
