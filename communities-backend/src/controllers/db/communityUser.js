import { Community } from "../../models/communityModel.js";
import { User } from "../../models/userModel.js";
import { CommunityUser } from "../../models/communityUserModel.js";
import * as CommunityDB from "../db/community.js";
import { Op } from "sequelize";
import { retainFields } from "../../utils/utilities/object.js";

const filename = "./logs/db.log";

// getUserIDByCommunityID

export const getUserIDByCommunityID = async (communityId) => {
  try {
    const users = await CommunityUser.findAll({
      attributes: ["user_id", "status", "privileges"],
      where: { community_id: communityId, status: "active" },
    });
    return users;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getUserIDByCommunityID" };
  }
};

// getRequestedUsersByCommunityID

export const getRequestedUsersByCommunityID = async (communityId) => {
  try {
    // get community type of communityId
    const community = await CommunityDB.getCommunityVisibilityByIDs([
      communityId,
    ]);
    if (community === null) {
      throw { error: null, msg: "Community not found" };
    }
    // check if community is request
    if (community.type !== "request") {
      throw { error: null, msg: "Community is not request-only" };
    }
    // get requested users
    const users = await CommunityUser.findAll({
      attributes: ["id", "status", "privileges"],
      where: { communityId: communityId, status: "requested" },
    });
    return users;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getRequestedUsersByCommunityID" };
  }
};

// getInvitedUsersByCommunityID

export const getInvitedUsersByCommunityID = async (communityId) => {
  try {
    // get community type of communityId
    const community = await CommunityDB.getCommunityVisibilityByIDs([
      communityId,
    ]);
    if (community === null) {
      throw { error: null, msg: "Community not found" };
    }
    // check if community is invite
    if (community.type !== "invite") {
      throw { error: null, msg: "Community is not invite-only" };
    }
    // get invited users
    const users = await CommunityUser.findAll({
      attributes: ["id", "status", "privileges"],
      where: { communityId: communityId, status: "invited" },
    });
    return users;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getInvitedUsersByCommunityID" };
  }
};

// getBannedUsersByCommunityID

export const getBannedUsersByCommunityID = async (communityId) => {
  try {
    const users = await CommunityUser.findAll({
      attributes: ["id", "status", "privileges"],
      where: { communitId: communityId, status: "banned" },
    });
    return users;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getBannedUsersByCommunityID" };
  }
};

// getAllUsersByCommunityID

export const getAllUsersByCommunityID = async (communityId) => {
  try {
    const users = await CommunityUser.findAll({
      attributes: ["id", "status", "privileges"],
      where: { communityId: communityId },
    });
    return users;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getAllUsersByCommunityID" };
  }
};

// getCommunityIDByUserID

export const getCommunityIDByUserID = async (userId) => {
  try {
    const communities = await CommunityUser.findAll({
      attributes: ["id", "status", "privileges"],
      where: { userId: userId, status: "active" },
    });
    return communities;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getCommunityIDByUserID" };
  }
};

// getRequestedCommunitiesByUserID

export const getRequestedCommunitiesByUserID = async (userId) => {
  try {
    const communities = await CommunityUser.findAll({
      attributes: ["id", "status", "privileges"],
      where: { userId: userId, status: "requested" },
    });
    return communities;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getRequestedCommunitiesByUserID" };
  }
};

// getInvitedCommunitiesByUserID

export const getInvitedCommunitiesByUserID = async (userId) => {
  try {
    const communities = await CommunityUser.findAll({
      attributes: ["id", "status", "privileges"],
      where: { userId: userId, status: "invited" },
    });
    return communities;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getInvitedCommunitiesByUserID" };
  }
};

// getBannedCommunitiesByUserID

export const getBannedCommunitiesByUserID = async (userId) => {
  try {
    const communities = await CommunityUser.findAll({
      attributes: ["id", "status", "privileges"],
      where: { userId: userId, status: "banned" },
    });
    return communities;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getBannedCommunitiesByUserID" };
  }
};

// getStatusByCommunityUser

export const getStatusByCommunityUser = async (userId, communityId) => {
  try {
    const communityUser = await CommunityUser.findOne({
      where: { userId: userId, communityId: communityId },
    });

    // logging the communityUser
    fs.appendFileSync(filename, `getStatusByCommunityUser: ${communityUser}\n`);
    if (communityUser === null) {
      throw { error: null, msg: "CommunityUser not found" };
    }
    return communityUser;
  } catch (err) {
    console.log(err);
    if (err.msg === "CommunityUser not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getStatusByCommunityUser" };
  }
};

// getPrivilegesByCommunityUser

export const getPrivilegesByCommunityUser = async (userId, communityId) => {
  try {
    const communityUser = await CommunityUser.findOne({
      where: { userId: userId, communityId: communityId },
    });

    // logging the communityUser
    fs.appendFileSync(
      filename,
      `getPrivilegesByCommunityUser: ${communityUser}\n`
    );
    if (communityUser === null) {
      throw { error: null, msg: "CommunityUser not found" };
    }
    return communityUser;
  } catch (err) {
    console.log(err);
    if (err.msg === "CommunityUser not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getPrivilegesByCommunityUser" };
  }
};

// addCommunityUser

export const addCommunityUser = async (userId, communityId, status) => {
  try {
    // check if community exists
    const community = await CommunityDB.getCommunityById(communityId);
    if (community === null) {
      throw { error: null, msg: "Community not found" };
    }
    // check if user exists
    const user = await User.findOne({ where: { id: userId } });
    if (user === null) {
      throw { error: null, msg: "User not found" };
    }
    // get default privileges
    const post_priv = community.post_privilege === true ? "1" : "0";
    const comment_priv = community.comment_privilege === true ? "1" : "0";
    const privileges = post_priv + comment_priv;

    const communityUser = await CommunityUser.create({
      userId: userId,
      communityId: communityId,
      status: status,
      privileges: privileges,
    });

    // logging the communityUser
    fs.appendFileSync(filename, `addCommunityUser: ${communityUser}\n`);
    return communityUser;
  } catch (err) {
    console.log(err);
    if (err.msg === "Community not found" || err.msg === "User not found") {
      throw err;
    }
    throw { error: err, msg: "Error in addCommunityUser" };
  }
};

// updateCommunityUser

export const updateCommunityUser = async (userId, communityId, update) => {
  try {
    const communityUser = await CommunityUser.update(update, {
      where: { userId: userId, communityId: communityId },
    });
    // logging the communityUser
    update = retainFields(update, [
      "status",
      "post privilege",
      "comment privilege",
    ]);
    fs.appendFileSync(filename, `updateCommunityUser: ${communityUser}\n`);
    if (communityUser === null) {
      throw { error: null, msg: "CommunityUser not found" };
    }
    return communityUser;
  } catch (err) {
    console.log(err);
    if (err.msg === "CommunityUser not found") {
      throw err;
    }
    throw { error: err, msg: "Error in updateCommunityUser" };
  }
};

// leaveCommunity

export const leaveCommunity = async (userId, communityId) => {
  try {
    const communityUser = await CommunityUser.update(
      {
        status: "left",
        leftAt: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
      },
      { where: { userId: userId, communityId: communityId } }
    );
    // logging the communityUser
    fs.appendFileSync(filename, `leaveCommunity: ${communityUser}\n`);
    if (communityUser === null) {
      throw { error: null, msg: "CommunityUser not found" };
    }
    return communityUser;
  } catch (err) {
    console.log(err);
    if (err.msg === "CommunityUser not found") {
      throw err;
    }
    throw { error: err, msg: "Error in leaveCommunity" };
  }
};

// changePrivileges

export const changePrivileges = async (userId, communityId, privileges) => {
  try {
    let post_priv = "0";
    let comment_priv = "0";
    // MOD(TODO)
    if (privileges.comment_privilege === true) {
      comment_priv = "1";
    }
    if (privileges.post_privilege === true) {
      post_priv = "1";
    }
    const priv = post_priv + comment_priv;
    const communityUser = await CommunityUser.update(
      { privileges: priv },
      { where: { userId: userId, communityId: communityId } }
    );
    // logging the communityUser
    fs.appendFileSync(filename, `changePrivileges: ${communityUser}\n`);
    if (communityUser === null) {
      throw { error: null, msg: "CommunityUser not found" };
    }
    return communityUser;
  } catch (err) {
    console.log(err);
    if (err.msg === "CommunityUser not found") {
      throw err;
    }
    throw { error: err, msg: "Error in changePrivileges" };
  }
};

// banUser

export const banUser = async (userId, communityId, reason, bannedBy) => {
  try {
    if (!reason) {
      throw { error: null, msg: "Missing ban reason" };
    }
    const communityUser = await CommunityUser.update(
      {
        status: "banned",
        bannedReason: reason,
        bannedBy: bannedBy,
        bannedAt: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
      },
      { where: { userId: userId, communityId: communityId } }
    );
    // logging the communityUser
    fs.appendFileSync(filename, `banUser: ${communityUser}\n`);
    if (communityUser === null) {
      throw { error: null, msg: "CommunityUser not found" };
    }
    return communityUser;
  } catch (err) {
    console.log(err);
    if (err.msg === "CommunityUser not found") {
      throw err;
    }
    throw { error: err, msg: "Error in banUser" };
  }
};

// unbanUser

export const unbanUser = async (userId, communityId) => {
  try {
    const communityUser = await CommunityUser.update(
      {
        status: "active",
        bannedReason: "",
        bannedBy: null,
        bannedAt: null,
      },
      { where: { userId: userId, communityId: communityId } }
    );
    // logging the communityUser
    fs.appendFileSync(filename, `unbanUser: ${communityUser}\n`);
    if (communityUser === null) {
      throw { error: null, msg: "CommunityUser not found" };
    }
    return communityUser;
  } catch (err) {
    console.log(err);
    if (err.msg === "CommunityUser not found") {
      throw err;
    }
    throw { error: err, msg: "Error in unbanUser" };
  }
};

// rejectRequest

export const rejectRequest = async (userId, communityId) => {
  try {
    const communityUser = await CommunityUser.update(
      { status: "rejected-request" },
      { where: { userId: userId, communityId: communityId } }
    );
    // logging the communityUser
    fs.appendFileSync(filename, `rejectRequest: ${communityUser}\n`);
    if (communityUser === null) {
      throw { error: null, msg: "CommunityUser not found" };
    }
    return communityUser;
  } catch (err) {
    console.log(err);
    if (err.msg === "CommunityUser not found") {
      throw err;
    }
    throw { error: err, msg: "Error in rejectRequest" };
  }
};
