const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register
exports.registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.redirect("/auth/register?error=User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ userName, email, password: hashedPassword });

    await user.save();
    res.redirect("/auth/login");
  } catch (err) {
    console.error(err);
    res.status(500).send("Registration failed");
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.redirect("/auth/login?error=Invalid Email");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.redirect("/auth/login?error=Invalid Password");

    req.session.user = { id: user._id, userName: user.userName };
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed");
  }
};

// Logout
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Logout failed");
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
};
