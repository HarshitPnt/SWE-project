import * as CommunityUserDB from "./db/communityUser.js";
import { CommunityUser } from "../models/communityUserModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await CommunityUserDB.getUserIDByCommunityID(id);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getAllUsers" });
  }
};

export const getRequested = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await CommunityUserDB.getRequestedUsersByCommunityID(id);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    if (err.error.msg === "Community is not request-only")
      res.status(400).json({ msg: "Community is not request-only" });
    else res.status(500).json({ msg: "Error in getRequested" });
  }
};

export const getInvited = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await CommunityUserDB.getInvitedUsersByCommunityID(id);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    if (err.error.msg === "Community is not invite-only")
      res.status(400).json({ msg: "Community is not invite-only" });
    else res.status(500).json({ msg: "Error in getInvited" });
  }
};
