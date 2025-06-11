const Group = require("../../Models/groupModel");
const User = require("../../Models/userModels");
exports.createGroup = async (req, res) => {
    try {
        const { name, members } = req.body;
        const adminId = req.user._id;
        if (!members.includes(String(adminId))) {
            console.log(adminId)
            members.push(adminId)
        };
        let group = new Group({ name, members, admins: [adminId] });
        await group.save();
        await User.updateMany(
            { _id: { $in: members } },
            { $push: { groups: group._id } }
        )

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