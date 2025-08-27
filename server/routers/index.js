const express = require("express");
const router = express.Router();

const ControllerAi = require("../controllers/ControllerAi");

router.post("/generateAi", ControllerAi.generateAi);

module.exports = router;
