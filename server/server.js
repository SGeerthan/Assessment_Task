const express = require("express")
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const fs = require("fs");
const PORT = 5000;
const SECRET_KEY = "your_secret_key"; 

app.use(bodyParser.json());

const users = JSON.parse(fs.readFileSync("userCredentials.json", "utf8"));

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token == null) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token is not valid" });
    req.user = user;
    next();
  });
};

app.get("/api/home", authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}!` });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
