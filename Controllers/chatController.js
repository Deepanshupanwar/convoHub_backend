const createChat = require("./chat/createChat");
const getMessage = require("./chat/getMessage");
const sendMessage = require("./chat/sendMessage");
const getChats = require("./chat/getChats");

module.exports = {
    createChat: createChat.createChat,
    getMessage: getMessage.getMessage,
    sendMessage: sendMessage.sendMessage,
    getChats: getChats.getChats
}