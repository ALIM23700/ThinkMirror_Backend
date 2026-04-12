const express = require("express");
const { analyzeThought } = require("../controller/analyzeController");
const router = express.Router();


router.post("/",analyzeThought);

module.exports = router;