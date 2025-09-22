// Q3: Role-based access with bcrypt + JWT
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const JWT_SECRET = "supersecretkey123";
let users = [];

// Middleware
function auth(requiredRole = null) {
  return (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token" });

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ msg: "Access denied" });
      }
      next();
    } catch {
      res.status(401).json({ msg: "Invalid token" });
    }
  };
}

// Register
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed, role: role || "user" });
  res.json({ msg: "User registered" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign({ username, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Routes
app.get("/dashboard", auth(), (req, res) => {
  res.json({ msg: `Welcome ${req.user.username}`, role: req.user.role });
});

app.get("/admin", auth("admin"), (req, res) => {
  res.json({ msg: "Welcome Admin, you have full access" });
});

app.listen(5000, () => console.log("Q3 server running on port 5000"));
