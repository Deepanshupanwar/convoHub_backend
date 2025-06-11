const accept = require("./connections/add");
const reject = require("./connections/reject");
const send = require("./connections/send");
const getConnections = require("./connections/getConnections");
const getRequests = require("./connections/getRequests");
const searchUser =require("./connections/searchUser")

module.exports = {
    accept: accept.accept,
    reject: reject.reject,
    send: send.send,
    getConnections: getConnections.getConnections,
    getRequests: getRequests.getRequests,
    searchUser: searchUser.searchUser
};