import { User } from "../models/userModel.js";
import * as UserDB from "../controllers/db/user.js";
import { query } from "express";

// getUser
export const getUser = async (req, res) => {
  try {
    const query = req.query;
    console.log(query);
    let user = null;
    if (query.id) {
      user = await UserDB.getUserById(query.id);
    } else if (query.username) {
      user = await UserDB.getUserByUsername(query.username);
    } else if (query.email) {
      user = await UserDB.getUserByEmail(query.email);
    } else {
      res.status(400).json({ msg: "Invalid query" });
    }
    if (user === null) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
