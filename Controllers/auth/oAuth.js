const jwt = require("jsonwebtoken");

exports.googleCallback = (req, res) => {
    const { user, token } = req.user;
    res.status(200).cookie("convoHub", token, { httpOnly: true })
    res.redirect("http://localhost:5173/");
};
