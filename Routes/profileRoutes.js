const express = require('express');
const profileController = require("../Controllers/profileController")
const router = express.Router();

router.put("/editProfile",profileController.editProfile)

module.exports = router;