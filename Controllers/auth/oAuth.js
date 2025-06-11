const jwt = require("jsonwebtoken");

exports.googleCallback = (req, res) => {
    const { user, token } = req.user;
    res.cookie("convoHub", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).redirect("http://localhost:5173/");
};
