import { Community } from "../models/communityModel.js";
import * as PostDB from "./db/posts.js";
import * as UserDB from "./db/user.js";
import * as CommunityDB from "./db/community.js";
import { checkCommunityAdmin } from "../middleware/users/checkRoles.js";
import { retainFields } from "../utils/utilities/object.js";
import {
  getMemberCommunities,
  getPublicCommunities,
} from "../utils/CommunityFilter/filterByVisibility.js";

// getCommunityByID
export const getCommunityByID = async (req, res) => {
  try {
    const id = req.params.id;
    if (id <= 0) throw { error: null, msg: "Invalid id" };
    let community = await CommunityDB.getCommunityById(id);
    if (req.verified === false) community = getPublicCommunities([community]);
    else community = getMemberCommunities([community], req.username);
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

// getCommunityByOwner
export const getCommunityByOwner = async (req, res) => {
  try {
    const owner_id = req.params.owner_id;
    let community = await CommunityDB.getCommunityByOwner(owner_id);
    if (req.verified === false) community = getPublicCommunities([community]);
    else community = getMemberCommunities([community], req.username);
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

// searchCommunity
export const searchCommunity = async (req, res) => {
  try {
    const query = req.query.community;
    const communities = await CommunityDB.searchCommunity(query);
    if (req.verified === false) communities = getPublicCommunities(communities);
    else communities = getMemberCommunities(communities, req.username);
    res.status(200).json(communities);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in searchCommunity" });
  }
};

// getAllBannedCommunities
export const getAllBannedCommunities = async (req, res) => {
  try {
    const communities = await CommunityDB.getAllBannedCommunities();
    res.status(200).json(communities);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getAllBannedCommunities" });
  }
};

// updateCommunity
export const updateCommunity = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCommunity = await CommunityDB.updateCommunity(id, req.body);
    res.status(200).json(updatedCommunity);
  } catch (err) {
    console.log(err);
    if (err.msg === "Community not found") {
      res.status(404).json({ msg: "Community not found" });
      return;
    }
    res.status(500).json({ msg: "Error in updateCommunity" });
  }
};

// banCommunity
export const banCommunity = async (req, res) => {
  try {
    const id = req.params.id;
    const community = await CommunityDB.banCommunity(id);
    res.status(200).json(community);
  } catch (err) {
    console.log(err);
    if (err.msg === "Community not found") {
      res.status(404).json({ msg: "Community not found" });
      return;
    }
    res.status(500).json({ msg: "Error in banCommunity" });
  }
};

// unbanCommunity
export const unbanCommunity = async (req, res) => {
  try {
    const id = req.params.id;
    const community = await CommunityDB.unbanCommunity(id);
    res.status(200).json(community);
  } catch (err) {
    console.log(err);
    if (err.msg === "Community not found") {
      res.status(404).json({ msg: "Community not found" });
      return;
    }
    res.status(500).json({ msg: "Error in unbanCommunity" });
  }
};

// createCommunity
export const createCommunity = async (req, res) => {
  try {
    if (req.verified === false) {
      res.status(403).json({ msg: "Invalid Token" });
      return;
    }
    const username = req.username;
    const user = await UserDB.getUserByUsername(username);
    req.body.data.creator_id = user.id;
    if (!req.body.data.name)
      res.status(400).json({ msg: "Community name is required" });
    req.body.data = retainFields(req.body.data, [
      "name",
      "description",
      "visibility",
      "banner_image",
      "post_privilege",
      "comment_privilege",
      "allowed_posts",
    ]);
    const community = await CommunityDB.createCommunity(username, req.body);
    res.status(200).json(community);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in createCommunity" });
  }
};

// deleteCommunity
export const deleteCommunity = async (req, res) => {
  try {
    const id = req.params.id;
    const community = await CommunityDB.updateCommunity(id, {
      status: "deleted",
    });
    res.status(200).json(community);
  } catch (err) {
    console.log(err);
    if (err.msg === "Community not found") {
      res.status(404).json({ msg: "Community not found" });
      return;
    }
    res.status(500).json({ msg: "Error in deleteCommunity" });
  }
};
