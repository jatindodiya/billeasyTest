const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const db = require("../config/db"); // db connection pool
const router = express.Router();

// user register
router.post("/register", async (req, res) => {

  // console.log(req.body)
  const { mobile, email, password , role} = req.body;
  if(!(mobile?.trim() && email?.trim() && password?.trim() && role?.trim())) return res.status(400).json({ message: "error: Bad Request" }); 

  try {
    const [existingUsers] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    // console.log(existingUsers)

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "error: User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      mobile,
      email,
      password: hashedPassword,
      role
    };
    // console.log(newUser)
    await db.query("INSERT INTO users (user_id, mobile, email, password, role) VALUES (?, ?, ?, ?, ?)", [newUser.id, newUser.mobile, newUser.email, newUser.password, newUser.role]);
    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
   
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error: Database connection" });
  }
});

// User login 
router.post("/login", async (req, res) => {

  // console.log(req.body)
  const { email, password } = req.body;
  if(!(email?.trim() && password?.trim())) return res.status(400).json({ message: "error: Bad Request" }); 

  try {

    const [results] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    // console.log(results)
    if (results.length === 0) {
      return res.status(401).json({ message: "error: User not Found" });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT token
    const token = jwt.sign(
      { userId: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // 1 hour token expire time
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

module.exports = router;