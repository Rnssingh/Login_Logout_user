
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already used" });

    const user = new User({ username, email, password });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ message: "Login success", token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
