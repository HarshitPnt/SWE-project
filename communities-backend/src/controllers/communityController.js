import { Community } from "../models/communityModel.js";
import * as PostDB from "./db/posts.js";
import * as UserDB from "./db/user.js";
import * as CommunityDB from "./db/community.js";

// getCommunityByID
export const getCommunityByID = async (req, res) => {
  try {
    const id = req.params.id;
    if (id <= 0) throw { error: null, msg: "Invalid id" };
    const community = await CommunityDB.getCommunityById(id);
    res.status(200).json(community);
  } catch (err) {
    console.log(err);
    if (err.msg === "Invalid id" || err.msg === "Community not found") {
      res.status(404).json({ msg: "Community not found" });
      return;
    }
    res.status(500).json({ msg: "Error in getCommunityByID" });
  }
};

// getCommunityByName
export const getCommunityByName = async (req, res) => {
  try {
    const name = req.params.name;
    const community = await CommunityDB.getCommunityByName(name);
    res.status(200).json(community);
  } catch (err) {
    console.log(err);
    if (err.msg === "Community not found") {
      res.status(404).json({ msg: "Community not found" });
      return;
    }
    res.status(500).json({ msg: "Error in getCommunityByName" });
  }
};

// getCommunityByOwner
export const getCommunityByOwner = async (req, res) => {
  try {
    const owner_id = req.params.owner_id;
    const community = await CommunityDB.getCommunityByOwner(owner_id);
    res.status(200).json(community);
  } catch (err) {
    console.log(err);
    if (err.msg === "Community not found") {
      res.status(404).json({ msg: "Community not found" });
      return;
    }
    res.status(500).json({ msg: "Error in getCommunityByOwner" });
  }
};
