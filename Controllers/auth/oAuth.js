const jwt = require("jsonwebtoken");

exports.googleCallback = (req, res) => {
    const { user, token } = req.user;
    res.redirect("https://convo-hub-frontend-three.vercel.app");
    res.cookie("convoHub", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
};
