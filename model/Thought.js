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

    // (NO CHANGE — as you requested)
    riskScore: String,
    recommendation: String,

    // 🔐 FIXED ONLY THIS PART
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Thought", thoughtSchema);