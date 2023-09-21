const { json } = require("express");
const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const registerUser = async (req, res) => {
  try {
    if (!req?.body?.username || !req?.body?.password)
      return res.status(400).json({ error: "username or password missing" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ errorMSG: error.message });
  }
};
const loginUser = async (req, res) => {
  try {
    if (!req?.body?.username || !req?.body?.password) {
      console.log("username or password missing");
      return res.status(400).json({ error: "username or password missing" });
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) return user.status(404).json({ error: "wrong info,try again" });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      //generate token
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      res.cookie("jwt", token, {
        httpOnly: true,

        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ message: "logged in " });
    } else {
      console.log("wrong pass");
      res.status(401).json({ error: "wrong password " });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errorMSG: error.message });
  }
};

const logoutUser = async (req, res) => {
  // console.log("1", typeof req?.cookies?.jwt);
  // console.log("1", req?.cookies?.jwt);

  if (!req?.cookies?.jwt) return res.sendStatus(204);

  // res.clearCookie("jwt", {
  //   httpOnly: true,
  //   sameSite: "None",
  //   maxAge: 24 * 60 * 60 * 1000,
  // });

  res.status(200).cookie("jwt", "").json({ message: "ok" });
};

const profile = async (req, res) => {
  // console.log("2", typeof req?.cookies?.jwt);
  // console.log("2", req?.cookies?.jwt);
  if (req?.cookies?.jwt === "" || req?.cookies?.jwt === undefined) {
    return res.status(400).json({ error: "not logged in yet" });
  }
  jwt.verify(
    req?.cookies?.jwt,
    process.env.TOKEN_SECRET,
    {},
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ err: err.message });
      }
      return res.status(200).json(decoded);
    }
  );
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    return res.status(500).json({ ererrorr: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  profile,
  getUser,
};
