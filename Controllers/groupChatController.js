const createGroup = require("./groupChat/createGroup");
const sendMessage = require("./groupChat/sendMessage");
const getMessages = require("./groupChat/getMessages");
const addMember = require("./groupChat/addMember");
const removeMember = require("./groupChat/removeMember");
const getGroupChats = require("./groupChat/getGroupChats");
const updateGroupIcon = require("./groupChat/updateGroupIcon")

module.exports = {
    createGroup: createGroup.createGroup,
    sendMessage: sendMessage.sendMessage,
    getMessages: getMessages.getMessages,
    addMember: addMember.addMember,
    removeMember: removeMember.removeMember,
    getGroupChats: getGroupChats.getGroupChats,
    updateGroupIcon: updateGroupIcon.updateGroupIcon
}