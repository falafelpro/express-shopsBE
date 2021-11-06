const User = require("../../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//const { token } = require("morgan");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../../config/key");

exports.signup = async (req, res, next) => {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    return res.status(201).json({
      status: "Sign-up completed",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    console.log(req.body);
    const token = generateToken(req.body);
    console.log(token);
    res.json({ token: token });
  } catch (error) {
    next(error);
  }
};

const generateToken = async (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };
  //console.log(JWT_SECRET);
  const token = jwt.sign(payload, JWT_SECRET);

  return token;
};
