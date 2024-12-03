const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./db/config");
const { signup } = require("./services/signup");
const { login } = require("./services/login");
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is up!");
});

app.post("/api/auth/signup", signup);
app.post("/api/auth/login", login);

// connectDB();

app.listen(PORT, () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});

module.exports = app;
