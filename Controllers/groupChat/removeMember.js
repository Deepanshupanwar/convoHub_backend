const Group = require("../../Models/groupModel")
const User = require("../../Models/userModels");
exports.removeMember = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { memberId } = req.body;
        const adminId = req.user._id;
        let group = await Group.findById(groupId);

        if (!group) return res.status(404).json({ message: "group not found" });
        if (!group.admins.includes(adminId)) return res.status(403).json({ message: "Only admin can remove members" });

        group.members = group.members.filter((id) => id.toString() !== memberId);
        await group.save();

        const member = await User.findById(memberId);
        member.groups = member.groups.filter((id) => id == group._id)
        await member.save();
        group = await Group.findById(group._id).populate("lastMessage").populate("members", "name email profilePic").populate("messages").populate("admins", "name email profilePic").populate({
            path: "messages",
            populate: {
                path: "sender",
                model: "user",
                select: "name _id",
            },
        });
        res.status(200).json(group);
    }
    catch (err) {
        res.status(500).json({ message: "server error" });
    }
}