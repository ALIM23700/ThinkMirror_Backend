const express = require("express");
const { analyzeThought } = require("../controller/analyzeController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();


router.post("/",authMiddleware,analyzeThought);

module.exports = router;