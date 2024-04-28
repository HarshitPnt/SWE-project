import * as UserDB from "../../controllers/db/user.js";
import * as AuthDB from "../../controllers/db/auth.js";
import { User } from "../../models/userModel.js";
import * as CommunityDB from "../../controllers/db/community.js";

export const checkSuperuser = async (req, res, next) => {
  try {
    let user;
    console.log(req.verified, req.username);
    if (req.verified === true)
      user = await UserDB.getUserByUsername(req.username);
    else res.status(403).json({ msg: "Invalid Token" });
    if (user.is_superuser === true) {
      next();
    } else {
      res.status(403).json({ msg: "User is not a superuser" });
    }
  } catch (err) {
    console.log(err);
    if (err.msg === "User not found") {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.status(500).json({ msg: "Error in checkSuperuser" });
  }
};

// TODO: Implement checkBanned middleware, and the below
export const checkCommunityAdmin = async (req, res, next) => {
  try {
    let community;
    let user;
    const community_id = req.params.id;
    if (req.verified) {
      community = await CommunityDB.getCommunityById(community_id);
      user = await UserDB.getUserByUsername(req.username);
    } else res.status(403).json({ msg: "Invalid Token" });
    if (user.id === community.creator_id) {
      next();
    } else {
      res.status(403).json({ msg: "User is not a community admin" });
    }
  } catch (err) {
    console.log(err);
    if (err.msg === "User not found") {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.status(500).json({ msg: "Error in checkCommunityAdmin" });
  }
};
