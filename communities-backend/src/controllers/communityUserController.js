import * as CommunityUserDB from "./db/communityUser.js";
import { CommunityUser } from "../models/communityUserModel.js";
import * as UserDB from "./db/user.js";
import { Community } from "../models/communityModel.js";

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

export const getBanned = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await CommunityUserDB.getBannedUsersByCommunityID(id);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getBanned" });
  }
};

export const getUserStatus = async (req, res) => {
  try {
    const community_id = req.params.community_id;
    const username = req.params.username;
    let user_id = undefined;
    console.log("Username: " + username);
    if (username != "undefined") {
      console.log("Username: " + username);
      user_id = await UserDB.getUserByUsername(username);
      user_id = user_id.id;
    } else console.log("Username is undefined");
    const communityUser = await CommunityUserDB.getStatusByCommunityUser(
      user_id,
      community_id
    );
    res.status(200).json(communityUser);
  } catch (err) {
    if (err.status === "not-in-community") {
      res.status(200).json({ status: err.status, type: err.type });
      return;
    }
    res.status(500).json({ msg: "Error in getCommunityUser" });
  }
};

export const getJoinedCommunities = async (req, res) => {
  try {
    if (!req.verified) {
      res.status(401).json({ msg: "Invalid Token" });
      return;
    }
    console.log(req.query.token);
    const username = req.query.username;
    const user = await UserDB.getUserByUsername(username);
    const user_id = user.id;
    console.log(user_id);
    const communities = await CommunityUser.findAll({
      attributes: ["community_id", "privileges"],
      where: { user_id: user_id, status: "active" },
    });
    console.log(communities);
    // console.log(communities);
    // get community names
    const comms = [];
    for (let i = 0; i < communities.length; i++) {
      // console.log("Community ID: ");
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
    res.status(500).json({ msg: "Error in getJoinedCommunities" });
  }
};

//getInvitedCommunities
export const getInvitedCommunities = async (req, res) => {
  try {
    if (!req.verified) {
      res.status(401).json({ msg: "Invalid Token" });
      return;
    }
    const username = req.query.username;
    const user = await UserDB.getUserByUsername(username);
    const user_id = user.id;
    const communities = await CommunityUser.findAll({
      attributes: ["community_id", "privileges"],
      where: { user_id: user_id, status: "invited" },
    });

    // get community names
    const comms = [];
    for (let i = 0; i < communities.length; i++) {
      console.log("Community ID: " + communities[i].community_id);
      const community = await Community.findOne({
        attributes: ["name"],
        where: { id: communities[i].dataValues.community_id },
      });
      comms.push({
        name: community.name,
        id: communities[i].dataValues.community_id,
      });
    }
    res.status(200).json(comms);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getInvitedCommunities" });
  }
};

//getRequestedCommunities

export const getRequestedCommunities = async (req, res) => {
  try {
    if (!req.verified) {
      res.status(401).json({ msg: "Invalid Token" });
      return;
    }
    const username = req.query.username;
    const user = await UserDB.getUserByUsername(username);
    const user_id = user.id;
    const communities = await CommunityUser.findAll({
      attributes: ["community_id", "privileges"],
      where: { user_id: user_id, status: "requested" },
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
        id: communities[i].dataValues.community_id,
      });
    }
    res.status(200).json(comms);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getRequestedCommunities" });
  }
};

// insert into community_user

export const insertCommunityUser = async (req, res) => {
  try {
    const community_id = req.parmas.id;
    const user_id = req.body.data.user_id;

    // get default privileges
    const community = await Community.findOne({
      attributes: ["post_privilege", "comment_privilege"],
      where: { id: community_id },
    });

    if (community === null) {
      res.status(404).json({ msg: "Community not found" });
      return;
    }
    const privileges = `${community.post_privilege ? 1 : 0} ${
      community.comment_privilege ? 1 : 0
    }`;
    const communityUser = await CommunityUser.create({
      user_id: user_id,
      community_id: community_id,
      privileges: privileges,
      status: "active",
    });
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in insertCommunityUser" });
  }
};

export const insertAdmin = async (req, res) => {
  try {
    const community_id = req.params.id;
    const username = req.body.data.username;
    const user = await UserDB.getUserByUsername(username);
    if (user === null) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    const user_id = user.id;
    console.log("Am i here", user_id);
    const communityUser = await CommunityUser.create({
      user_id: user_id,
      community_id: community_id,
      privileges: "11",
      status: "active",
    });
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in insertAdmin" });
  }
};
