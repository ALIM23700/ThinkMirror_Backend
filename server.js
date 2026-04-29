const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const router = require("./routes/analyzeRoutes");
const router2 = require("./routes/Thoghts");
const router3 = require("./routes/userRoutes");

// Load env variables
dotenv.config();

// Connect database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("ThinkMirror API running...");
});

// Example API (test)
app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

// Start server
const PORT = process.env.PORT || 5000;

app.use("/api/analyze",router);
app.use("/api/analyze",router2);
app.use("/api/analyze",router3);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});