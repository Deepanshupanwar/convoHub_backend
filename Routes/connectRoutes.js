const express = require("express");
const router = express.Router();
const connectController = require("../Controllers/connectController");

router.post("/send-request/:receiverId", connectController.send);
router.post("/accept-request/:senderId", connectController.accept);
router.post("/reject-request/:senderId", connectController.reject);
router.get("/requests", connectController.getRequests);
router.get("/connections", connectController.getConnections);
router.get("/searchUser/:email",connectController.searchUser)

module.exports = router;