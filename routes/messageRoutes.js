const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.get("/", messageController.getHomePage);
router.post("/create", messageController.createMessage);

module.exports = router;
