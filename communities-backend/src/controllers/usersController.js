import { User } from "../models/userModel.js";
import * as UserDB from "../controllers/db/user.js";

// getUserById
export const getUserById = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await UserDB.getUserById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};
