const loginController = require("./auth/login");
const registerController = require("./auth/register");
const logoutController = require("./auth/logout");
const oAuthController = require("./auth/oAuth");
const sendUser = require("./auth/sendUser");

module.exports = {
    login: loginController.login,
    register:registerController.register,
    logout: logoutController.logout,
    googleCallback: oAuthController.googleCallback,
    sendUser: sendUser.sendUser
};