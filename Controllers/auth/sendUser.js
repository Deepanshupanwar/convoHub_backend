const User = require("../../Models/userModels")
exports.sendUser = async (req, res) => {
    const user =await User.findById(req.user._id).populate("requestsReceived","name email profilePic").populate("connections","name email profilePic");
    res.status(200).json(user)
    
};
