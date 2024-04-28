import express from "express";
import jwt from "jsonwebtoken";
import { sha256 } from "js-sha256";
import { User } from "../models/userModel.js";
import fs from "fs";
import * as AuthDB from "../controllers/db/auth.js";
import * as UserDB from "../controllers/db/user.js";
import dotenv from "dotenv";
import { sendVerificationMail } from "../utils/Mailer/verificationMail.js";
import { verifyToken, generateToken } from "../utils/Authenticaion/JWT.js";
import { sendForgotPassword } from "../utils/Mailer/forgot.js";

dotenv.config();
const password_salt = process.env.SHA_SALT;

let unverifiedUsers = [];
let googleUsers;
let forgotPasswordUsers = [];

const filename = "./logs/log.log";

// Register User
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check if user exists
    const userExists = await AuthDB.getUserByUsername(username);
    if (userExists) {
      res.status(400).json({ msg: "Username already exists" });
      return;
    }

    // check if email exists
    const emailExists = await AuthDB.getUserByEmail(email);
    if (emailExists) {
      res.status(400).json({ msg: "Email already exists" });
      return;
    }

    // check password length
    if (password.length < 8) {
      res.status(400).json({ msg: "Password too short" });
      return;
    }

    // check if password contains a number, a lowercase letter, an uppercase letter and a special character
    let containsNumber = false;
    let containsLowercase = false;
    let containsUppercase = false;
    let containsSpecialCharacter = false;

    for (let i = 0; i < password.length; i++) {
      if (password[i] >= "0" && password[i] <= "9") {
        containsNumber = true;
      } else if (password[i] >= "a" && password[i] <= "z") {
        containsLowercase = true;
      } else if (password[i] >= "A" && password[i] <= "Z") {
        containsUppercase = true;
      } else {
        containsSpecialCharacter = true;
      }
    }

    if (
      !containsNumber ||
      !containsLowercase ||
      !containsUppercase ||
      !containsSpecialCharacter
    ) {
      res.status(400).json({
        msg: "Password must contain a number, a lowercase letter, an uppercase letter and a special character",
      });
      return;
    }

    // insert into unverified users
    unverifiedUsers.push({
      username: username,
      email: email,
      password: password,
      time: new Date(),
    });
    console.log(unverifiedUsers);

    // generate a token
    const token = jwt.sign(
      { username: username, email: email },
      password_salt,
      { expiresIn: "1d" }
    );

    // send verification mail
    sendVerificationMail(username, email, token);

    res.status(200).json({ msg: "Verification mail sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in register" });
  }
};

// insertUser
export const insertUserAuth = async (username, email, password) => {
  try {
    // create user
    console.log(username, email);
    const newUser = await UserDB.createUser(username, email);

    // create authentication
    const newAuth = await AuthDB.createUser(
      username,
      email,
      sha256(password + password_salt)
    );

    fs.appendFileSync(filename, `Register: ${newAuth}\n`);
  } catch (err) {
    console.log(err);
    fs.appendFileSync(filename, `Register: ${err}\n`);
    throw { error: err, msg: "Error in register" };
  }
};

// Verify User
export const verify = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, password_salt);

    const username = decoded.username;
    const email = decoded.email;
    console.log(username, email);
    console.log(unverifiedUsers);
    const users = unverifiedUsers.find(
      (user) => user.username === username && user.email === email
    );
    console.log(users);

    // find latest entry and delete others
    const latest = users;

    // insert user
    insertUserAuth(latest.username, latest.email, latest.password);

    // get token and refresh token
    const jwtoken = generateToken({ username: username });

    res.status(200).json({ token: jwtoken, msg: "User verified" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in verify" });
  }
};

// login
export const login = async (req, res) => {
  try {
    console.log("HERE");
    const { username, password } = req.body;
    const user = await AuthDB.getUserByUsername(username);

    if (user.password === sha256(password + password_salt)) {
      const jwtoken = generateToken({ username: username });
      res.status(200).json({ token: jwtoken, msg: "Login successful" });
    } else {
      res.status(400).json({ msg: "Incorrect password" });
    }
  } catch (err) {
    console.log(err);

    if (err.msg == "User not found") {
      res.status(400).json({ msg: "User does not exist" });
      return;
    }
    res.status(500).json({ msg: "Error in login" });
  }
};

export const google_C = async (req, res, next) => {
  try {
    const username = req.query.username;
    if (username) {
      const user = await UserDB.getUserByUsername(username);
      if (user) {
        res.status(400).json({ msg: "User already exists" });
        return;
      }
    }
    next();
  } catch (err) {
    console.log(err);
    if (err.msg === "User not found") {
      googleUsers = req.query.username;
      next();
    }
  }
};

export const google_R = async (req, res) => {
  try {
    // Successful authentication, redirect or respond as necessary
    // check is user with email exists
    const email = req.user._json.email;
    let user = await UserDB.getUserByEmail(email);
    if (user) {
      // get JWT token
      user = user.toJSON();
      const token = generateToken({ username: user.username });
      res.status(200).json({ token: token, msg: "Login successful" });
      googleUsers = undefined;
      return;
    }
    let username = googleUsers;
    if (username == undefined) {
      res.status(400);
      res.redirect(process.env.LOGIN_URL);
    }

    // check if user with username exists
    user = await UserDB.getUserByUsername(username);
  } catch (err) {
    console.log(err);
    if (err.msg === "User not found") {
      // insert user
      const username = googleUsers;
      const email = req.user._json.email;
      const picture = req.user._json.picture;
      let user = await UserDB.createUser(username, email);
      user = await UserDB.getUserByUsername(username);
      user = user.toJSON();
      if (picture) {
        user = await UserDB.updateUser(user.id, { profile_picture: picture });
      }
      // get JWT token
      const token = generateToken({ username: username });
      res.status(200).json({ token: token, msg: "Login successful" });
      googleUsers = undefined;
      res.redirect(process.env.FRONTEND_URL);
      return;
    }
    res.status(500);
    googleUsers = undefined;
    res.redirect(process.env.LOGIN_URL);
  }
};

// forgot password
export const forgot = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await AuthDB.getUserByUsername(username);
    if (!user) {
      res.status(400).json({ msg: "User is not in Auth" });
      return;
    }
    const email = user.email;

    // send forgot password mail
    const token = jwt.sign(
      { username: username, email: email },
      password_salt,
      { expiresIn: "1d" }
    );
    sendForgotPassword(username, email, token);

    res.status(200).json({ msg: "Forgot password mail sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in sendForgotMail" });
  }
};
