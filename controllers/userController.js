const User = require("../models/User");
const bcrypt = require("bcrypt");

// Create New User
exports.createNewUser = async (req, res) => {
  let { username, email, password } = req.body;

  try {
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      res.status(409).json({
        message: "Username or Email already exist!",
      });
    } else {
      let hashedPassword = await bcrypt.hash(password, 11);
      let user = new User({
        username,
        email,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Login Controller
exports.loginController = async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      let matchPass = await bcrypt.compare(password, user.password);
      if (matchPass) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "Invalid Password!",
        });
      }
    } else {
      res.status(404).json({
        message: "No User Found!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
