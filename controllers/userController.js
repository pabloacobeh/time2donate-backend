const bcrypt = require("bcrypt");
const { generateJwt } = require("../helpers/processJwt");
const User = require("../models/User");

const signUpUser = async (req, res) => {
  const { email, password, nickName } = req.body;
  const testEmail = await User.findOne({ email });
  if (testEmail)
    return res.status(500).json({ message: "Couldn't create user" });
  const testNickName = await User.findOne({ nickName });
  if (testNickName)
    return res.status(500).json({ message: "Couldn't create user" });

  const user = new User(req.body);

  try {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    user.save();
    const token = await generateJwt(user._id);
    return res.status(201).json({ user, token });
  } catch (error) {
    return res.status(500).json({ message: "Couldn't create the user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password, nickName } = req.body;
  const userEmail = await User.findOne({ email });
  if (!userEmail) {
    return res.status(500).json({ message: "Please Check credentials" });
  }
  const userNickName = await User.findOne({ nickName });
  if (!userNickName) {
    return res.status(500).json({ message: "Please Check credentials" });
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(500).json({ message: "Please Check credentials" });
  }
  const token = await generateJwt(user._id);
  return res.status(200).json({ token, user });
};

module.exports = {
  signUpUser,
  loginUser,
};
