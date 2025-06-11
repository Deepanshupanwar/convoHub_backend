const Group = require("../../Models/groupModel")
const cloudinary = require("../../Config/cloudinary")
exports.updateGroupIcon = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "group not found" });
        if (req.files && req.files.media) {
            const file = req.files.media
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "convoHubMessages",
                resource_type: "auto"
            });
            if (group?.groupPic) {
                const parts1 = group.groupPic.split('/');
                const parts2 = parts1[parts1.length - 1].split('.');
                const path = parts2[0];
                await cloudinary.uploader.destroy("convoHubMessages/" + path);
            }
            group.groupPic = result.secure_url;
            await group.save();
        }
        res.status(200).json({groupIcon: group.groupPic})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "server error" });
    }
}