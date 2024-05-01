import * as ModeratorDB from "./db/moderator.js";
import { checkFields, retainFields } from "../utils/utilities/object.js";
import * as UserDB from "./db/user.js";
import { getActiveUsers } from "../utils/UserFilter/filterByDeleted.js";
import * as CommunityUserDB from "./db/communityUser.js";
import { CommunityUser } from "../models/communityUserModel.js";
import { Moderators } from "../models/moderatorsModel.js";
import { User } from "../models/userModel.js";
import { Community } from "../models/communityModel.js";
import { where } from "sequelize";

// getModeratorByUserID
export const getModeratorByUserID = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    if (req.verified === false) {
      res.status(401).json({ msg: "Invalid Token" });
      return;
    }
    const user = await UserDB.getUserByUsername(req.username);
    console.log(user.id);
    if (userId != user.id) {
      res.status(403).json({ msg: "Invalid Token" });
      return;
    }
    const moderator = await ModeratorDB.getModByUserId(userId);
    res.status(200).json(moderator);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getModeratorByUserID" });
  }
};

// getModeratorByCommunityID
export const getModeratorByCommunityID = async (req, res) => {
  console.log("IN getModeratorByCommunityID");
  const communityId = req.params.id;
  console.log(communityId);
  try {
    let moderator = await ModeratorDB.getModByCommunityId(communityId);
    if (moderator === null) {
      res.status(404).json({ msg: "Moderator not found" });
      return;
    }
    if (moderator.length === 0) {
      res.status(404).json({ msg: "Moderator not found" });
      return;
    }
    res.status(200).json(moderator);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getModeratorByCommunityID" });
  }
};

// insertModerator

export const insertModerator = async (req, res) => {
  try {
    const fields = ["user_id", "community_id"];
    if (!req.body.data) {
      res.status(400).json({ msg: "Invalid fields" });
      return;
    }
    // check if user is active in community
    if (!checkFields(req.body.data, fields)) {
      res.status(400).json({ msg: "Invalid fields" });
      return;
    }
    let user = await UserDB.getUserById(req.body.data.user_id);
    if (user === null || user.is_deleted) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    // get user from community_members
    let communityUser = await CommunityUser.findOne({
      attributes: ["status"],
      where: {
        user_id: req.body.data.user_id,
        community_id: req.body.data.community_id,
      },
    });
    if (communityUser.status !== "active") {
      res.status(403).json({ msg: "User not in community" });
      return;
    }
    const moderator = await ModeratorDB.addMod(
      req.body.data.user_id,
      req.body.data.community_id
    );
    res.status(200).json(moderator);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in insertModerator" });
  }
};

// updateModerator
export const updateModeratorPrivileges = async (req, res) => {
  try {
    const fields = ["user_id", "community_id", "privileges"];
    if (!checkFields(req.body.data, fields)) {
      res.status(400).json({ msg: "Invalid fields" });
      return;
    }
    const moderator = await ModeratorDB.updateMod(
      req.body.data.user_id,
      req.body.data.community_id,
      req.body.data.privileges
    );
    res.status(200).json({ msg: "privileges updated" });
  } catch (err) {
    console.log(err);
    if (err.msg === "Moderator not found") {
      res.status(404).json({ msg: "Moderator not found" });
      return;
    }
    res.status(500).json({ msg: "Error in updateModerator" });
  }
};

// deleteModerator
export const deleteModerator = async (req, res) => {
  try {
    if (!checkFields(req.body.data, ["user_id", "community_id"])) {
      res.status(400).json({ msg: "Invalid fields" });
      return;
    }
    const userId = req.body.data.user_id;
    const communityId = req.body.data.community_id;
    const moderator = await ModeratorDB.removeMod(userId, communityId);
    res.status(200).json({ msg: "Moderator deleted" });
  } catch (err) {
    console.log(err);
    if (err.msg === "Moderator not found") {
      res.status(404).json({ msg: "Moderator not found" });
      return;
    }
    res.status(500).json({ msg: "Error in deleteModerator" });
  }
};

//getCommunities

export const getModeratorCommunities = async (req, res) => {
  try {
    if (req.verified === false) {
      res.status(401).json({ msg: "Invalid Token" });
      return;
    }
    const user = await User.findOne({
      where: { username: req.query.username },
    });
    const communities = await Moderators.findAll({
      attributes: ["community_id", "privileges"],
      where: { user_id: user.id },
    });

    // get community names
    const comms = [];
    for (let i = 0; i < communities.length; i++) {
      const community = await Community.findOne({
        attributes: ["name"],
        where: { id: communities[i].dataValues.community_id },
      });
      comms.push({
        name: community.name,
        privileges: communities[i].dataValues.privileges,
        id: communities[i].dataValues.community_id,
      });
    }
    res.status(200).json(comms);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getCommunities" });
  }
};
