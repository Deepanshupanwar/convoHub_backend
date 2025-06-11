const User = require("../Models/userModels")
const cloudinary = require("../Config/cloudinary")
async function editProfile(req, res) {
    try {
        const { name } = req.body;
        const user = await User.findById(req.user._id).populate("requestsReceived", "name email profilePic").populate("connections", "name email profilePic");
        if (name) {
            user.name = name;
        }
        if (req.files && req.files.media) {
            const file = req.files.media
            const result = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "convoHubMessages",
                resource_type: "auto"
            });
            if (user?.profilePic) {
                const parts1 = user.profilePic.split('/');
                const parts2 = parts1[parts1.length - 1].split('.');
                const path = parts2[0];
                await cloudinary.uploader.destroy("convoHubMessages/"+path);
            }
            user.profilePic = result.secure_url;
        }
        await user.save();
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json({ message: "server error" });
    }
}

module.exports = {
    editProfile
}