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

dotenv.config();
const password_salt = process.env.SHA_SALT;

let unverifiedUsers = [];

const filename = "./logs/log.log";

// Register User
export const register = async (req, res) => {
  try {
    console.log(req);
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
