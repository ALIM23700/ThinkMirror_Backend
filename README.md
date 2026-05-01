# 🧠 ThinkMirror Backend

AI-powered decision analysis backend API for the ThinkMirror project.  
It provides authentication, thought management, and AI-based analysis endpoints.

---


## 🚀 Live API
https://your-backend-url.com

---

## 📌 Features

- 🔐 User Authentication (Register / Login)
- 🧾 CRUD for Thoughts
- 🤖 AI-based Thought Analysis (`/analyze`)
- 🗂️ RESTful API structure
- 🔒 JWT Protected Routes
- 🧠 MongoDB Database Integration

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- dotenv

---

## 📁 Project Structure

ThinkMirror_Backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── utils/
├── server.js
└── .env

---

## ⚙️ Installation

### 1. Clone repo
```bash
git clone https://github.com/ALIM23700/ThinkMirror_Backend.git
cd ThinkMirror_Backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create .env file
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run server
```bash
npm start
```

Development mode:
```bash
npm run dev
```

---

## 📡 API Endpoints

### Auth
- POST /api/register
- POST /api/login

### Thoughts
- GET /api/thoughts
- POST /api/thoughts
- GET /api/thoughts/:id
- PUT /api/thoughts/:id
- DELETE /api/thoughts/:id

### AI Analysis
- POST /api/analyze

---

## 🔐 Auth Header
Authorization: Bearer <token>

---

## 🧠 About ThinkMirror

ThinkMirror helps users:
- Analyze thoughts
- Generate counter-arguments
- Improve decision-making clarity

---

## 👨‍💻 Developer
Abdul Alim — MERN Stack Developer

---

## 📄 License
MIT License
