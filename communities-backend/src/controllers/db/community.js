import { Community } from "../../models/communityModel.js";
import fs from "fs";
import { Op } from "sequelize";
import { retainFields } from "../../utils/utilities/object.js";

const filename = "./logs/db.log";

// getCommunityById

export const getCommunityById = async (id, banned = false) => {
  try {
    if (id <= 0) {
      throw { error: null, msg: "Invalid id" };
    }
    const community = await Community.findOne({
      where: {
        id: id,
        is_banned: banned,
        status: "active",
      },
    });

    // logging the community
    fs.appendFileSync(filename, `getCommunityById: ${community}\n`);
    // console.log(community);

    // check if community is null
    if (community === null) {
      throw { error: null, msg: "Community not found" };
    }
    return community;
  } catch (err) {
    console.log(err);
    if (err.msg === "Invalid id" || err.msg === "Community not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getCommunityById" };
  }
};

// getCommunityByName

export const getCommunityByName = async (name, banned = false) => {
  try {
    const community = await Community.findOne({
      where: { name: name, is_banned: banned, status: "active" },
    });

    // logging the community
    fs.appendFileSync(filename, `getCommunityByName: ${community}\n`);
    if (community === null) {
      throw { error: null, msg: "Community not found" };
    }
    return community;
  } catch (err) {
    // console.log(err);
    if (err.msg === "Community not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getCommunityByName" };
  }
};

// getCommunityByOwner
export const getCommunityByOwner = async (id, banned = false) => {
  try {
    const community = await Community.findAll({
      attributes: ["id"],
      where: { creater_id: id, is_banned: banned, status: "active" },
    });

    // logging the community
    fs.appendFileSync(filename, `getCommunityByOwner: ${community}\n`);
    if (community === null) {
      throw { error: null, msg: "Community not found" };
    }
    return community;
  } catch (err) {
    // console.log(err);
    if (err.msg === "Community not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getCommunityByOwner" };
  }
};

// getCommunityPrivilegesById
export const getCommunityPrivilegesById = async (id, banned = false) => {
  try {
    const community = await Community.findOne({
      where: { id: id, is_banned: banned, status: "active" },
    });

    // logging the community
    fs.appendFileSync(filename, `getCommunityPrivilegesById: ${community}\n`);
    if (community === null) {
      throw { error: null, msg: "Community not found" };
    }
    return {
      post_privileges: community.post_privileges,
      comment_privileges: community.comment_privileges,
    };
  } catch (err) {
    // console.log(err);
    if (err.msg === "Community not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getCommunityPrivilegesById" };
  }
};

// createCommunity
export const createCommunity = async (name, creater_id) => {
  try {
    const community = await Community.create({
      name: name,
      creater_id: creater_id,
    });

    // logging the community
    fs.appendFileSync(filename, `createCommunity: ${community}\n`);
    return community;
  } catch (err) {
    // console.log(err);
    throw { error: err, msg: "Error in createCommunity" };
  }
};

export const isActiveCommunity = async (id) => {
  try {
    const community = await Community.findOne({
      attributes: ["id", "status"],
      where: { id: id },
    });

    // logging the community
    fs.appendFileSync(filename, `isActiveCommunity: ${community}\n`);
    if (community.status !== "active") {
      return { active: false, status: community.status };
    }
    return { active: true };
  } catch (err) {
    // console.log(err);
    if (err.msg === "Community not found") {
      throw err;
    }
    throw { error: err, msg: "Error in isActiveCommunity" };
  }
};

// updateCommunity
export const updateCommunity = async (id, data) => {
  try {
    data = retainFields(data, [
      "description",
      "status",
      "visibility",
      "banner_image",
      "post_privilege",
      "comment_privilege",
      "allowed_posts",
    ]);
    console.log(data);
    if (data.status === "deleted")
      data.deleted_at = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
    data.updated_at = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    // check if community is deleted
    if (isActiveCommunity(id).active === false) {
      throw { error: null, msg: "Community not found" };
    }
    const community = await Community.update(data, { where: { id: id } });

    // logging the community
    fs.appendFileSync(filename, `updateCommunity: ${community}\n`);
    return community;
  } catch (err) {
    // console.log(err);
    throw { error: err, msg: "Error in updateCommunity" };
  }
};

// searchCommunity

export const searchCommunity = async (searchString) => {
  try {
    const community = await Community.findAll({
      attributes: ["id", "name", "visibility", "status"],
      where: {
        name: {
          [Op.startsWith]: searchString + "%",
        },
      },
    });

    // logging the community
    fs.appendFileSync(filename, `searchCommunity: ${community}\n`);
    return community;
  } catch (err) {
    // console.log(err);
    throw { error: err, msg: "Error in searchCommunity" };
  }
};

// getCommunityVisibilityByIDs

export const getCommunityVisibilityByIDs = async (id_list) => {
  try {
    const community = await Community.findAll({
      attributes: ["id", "visibility", "status"],
      where: {
        id: id_list,
      },
    });

    // logging the community
    fs.appendFileSync(filename, `getCommunityVisibilityByIDs: ${community}\n`);
    return community;
  } catch (err) {
    // console.log(err);
    throw { error: err, msg: "Error in getCommunityVisibilityByIDs" };
  }
};

// getAllBannedCommunities
export const getAllBannedCommunities = async () => {
  try {
    const community = await Community.findAll({
      attributes: ["id", "name"],
      where: { is_banned: true },
    });

    // logging the community
    fs.appendFileSync(filename, `getAllBannedCommunities: ${community}\n`);
    return community;
  } catch (err) {
    // console.log(err);
    throw { error: err, msg: "Error in getAllBannedCommunities" };
  }
};

// banCommunity
export const banCommunity = async (id, reason) => {
  try {
    if (isActiveCommunity(id) === false) {
      throw { error: null, msg: "Community already banned" };
    }
    if (reason === "") {
      throw { error: null, msg: "Reason cannot be empty" };
    }
    const community = await Community.update(
      { is_banned: true, banned_reason: reason, status: "banned" },
      { where: { id: id } }
    );

    // logging the community
    fs.appendFileSync(filename, `banCommunity: ${community}\n`);
    return community;
  } catch (err) {
    // console.log(err);
    if (
      err.msg === "Community not found" ||
      err.msg === "Community already banned" ||
      err.msg === "Reason cannot be empty"
    ) {
      throw err;
    }
    throw { error: err, msg: "Error in banCommunity" };
  }
};

// unbanCommunity
export const unbanCommunity = async (id) => {
  try {
    const _ret = isActiveCommunity(id);
    if (_ret.active === false && _ret.status === "deleted") {
      throw { error: null, msg: "Community is deleted" };
    }
    const community = await Community.update(
      { is_banned: false, banned_reason: "", status: "active" },
      { where: { id: id } }
    );

    // logging the community
    fs.appendFileSync(filename, `unbanCommunity: ${community}\n`);
    return community;
  } catch (err) {
    // console.log(err);
    if (err.msg === "Community not found") {
      throw err;
    }
    throw { error: err, msg: "Error in unbanCommunity" };
  }
};
