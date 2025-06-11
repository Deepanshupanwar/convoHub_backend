const express = require("express");
const authControllers = require("../Controllers/authController");
const router = express.Router();
const passport = require("passport")
const {Verify} = require("../Middlewares/verfiy");

router.post("/login",authControllers.login);
router.post("/register",authControllers.register);
router.post("/logout",authControllers.logout);
router.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/google/callback",passport.authenticate("google", { session: false }),authControllers.googleCallback);
router.get("/checklogin",Verify,authControllers.sendUser)

module.exports = router;