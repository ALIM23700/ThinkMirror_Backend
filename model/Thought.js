const mongoose = require("mongoose");

const thoughtSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    type: String,
    counterArguments: [String],
    advantages: [String],

    riskScore: String,
    recommendation: String,

    // 🔐 ADD THIS (VERY IMPORTANT)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Thought", thoughtSchema);