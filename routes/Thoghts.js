const express = require("express");
const router2 = express.Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require("../controller/ThoghtsController");

// 🔹 CREATE
router2.post("/thoughts", createThought);

// 🔹 READ ALL
router2.get("/thoughts", getAllThoughts);

// 🔹 READ ONE
router2.get("/thoughts/:id", getThoughtById);

// 🔹 UPDATE
router2.put("/thoughts/:id", updateThought);

// 🔹 DELETE
router2.delete("/thoughts/:id", deleteThought);

module.exports = router2;