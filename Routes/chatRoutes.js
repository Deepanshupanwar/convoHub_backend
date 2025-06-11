const express = require("express");
const router = express.Router();
const chatController = require("../Controllers/chatController");

router.post("/create",chatController.createChat);
router.put("/send/:chatId", chatController.sendMessage);
router.get("/:chatId/messages",chatController.getMessage);
router.get("/getchats", chatController.getChats);

module.exports = router;