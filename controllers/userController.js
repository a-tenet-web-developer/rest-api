const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ message: "Email already exists" });

  const { name, email, password, role, mobile } = req.body;
  const user = new User({ name, email, password, role, mobile });
  await user.save();
  res.status(201).json({ message: "User registered successfully", user });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
