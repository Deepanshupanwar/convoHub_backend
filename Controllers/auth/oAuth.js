const jwt = require("jsonwebtoken");

exports.googleCallback = (req, res) => {
    const { user, token } = req.user;
    res.redirect(`https://convo-hub-frontend-three.vercel.app/oauth-success?token=${token}`)
    
};
