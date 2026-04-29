const Thought = require("../model/Thought");

// 🔹 GET ALL (USER HISTORY)
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: thoughts.length,
      data: thoughts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 GET BY ID (USER SAFE)
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!thought) {
      return res.status(404).json({
        success: false,
        message: "Thought not found",
      });
    }

    res.status(200).json({
      success: true,
      data: thought,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 CREATE (WITH USER ATTACHMENT)
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: thought,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 UPDATE (ONLY OWNER CAN UPDATE)
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({
        success: false,
        message: "Thought not found",
      });
    }

    res.status(200).json({
      success: true,
      data: thought,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 DELETE (ONLY OWNER CAN DELETE)
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!thought) {
      return res.status(404).json({
        success: false,
        message: "Thought not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Thought deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
};