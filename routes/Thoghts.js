const express = require("express");
const router2 = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require("../controller/ThoghtsController");


// 🔐 CREATE (must be logged in)
router2.post("/thoughts", authMiddleware, createThought);

// 🔐 READ ALL (user history → must be logged in)
router2.get("/thoughts", authMiddleware, getAllThoughts);

// 🔐 READ ONE (must be logged in)
router2.get("/thoughts/:id", authMiddleware, getThoughtById);

// 🔐 UPDATE (must be logged in)
router2.put("/thoughts/:id", authMiddleware, updateThought);

// 🔐 DELETE (must be logged in)
router2.delete("/thoughts/:id", authMiddleware, deleteThought);

module.exports = router2;