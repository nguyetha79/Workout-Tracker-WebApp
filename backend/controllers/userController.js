// Author: iamshaunjp
// Date: 15 June 2022
// Title of source code: MERN Authentication Tutorial - Signing Tokens
// Type: source code
// Web address: https://github.com/iamshaunjp/MERN-Auth-Tutorial/blob/lesson-6/backend/controllers

const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const {email, password} = req.body;

   try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Author: iamshaunjp
// Date: 15 June 2022
// Title of source code: MERN Authentication Tutorial - Logging Users In
// Type: source code
// Web address: https://github.com/iamshaunjp/MERN-Auth-Tutorial/blob/lesson-7/backend/controllers

// signup user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ username, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
