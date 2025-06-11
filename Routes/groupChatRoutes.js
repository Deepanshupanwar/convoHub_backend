const express = require("express"); 
const groupChatController = require("../Controllers/groupChatController");

const router = express.Router();

router.post("/create",groupChatController.createGroup);
router.post("/send/:groupId",groupChatController.sendMessage); 
router.get("/:groupId/messages",  groupChatController.getMessages); 
router.post("/:groupId/add",  groupChatController.addMember); 
router.post("/:groupId/remove", groupChatController.removeMember);
router.get("/getGroupChats",groupChatController.getGroupChats);
router.put("/updateIcon/:groupId", groupChatController.updateGroupIcon); 

module.exports = router;
