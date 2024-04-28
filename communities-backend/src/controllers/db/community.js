import { Community } from "../../models/communityModel.js";
import fs from "fs";
import { Op } from "sequelize";

const filename = "./logs/db.log";

// getCommunityById

export const getCommunityById = async (id) => {
  try {
    if (id <= 0) {
      throw { error: null, msg: "Invalid id" };
    }
    const community = await Community.findOne({
      where: {
        id: id,
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

export const getCommunityByName = async (name) => {
  try {
    const community = await Community.findOne({ where: { name: name } });

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
export const getCommunityByOwner = async (id) => {
  try {
    const community = await Community.findAll({
      attributes: ["id"],
      where: { creater_id: id },
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
export const getCommunityPrivilegesById = async (id) => {
  try {
    const community = await Community.findOne({
      where: { id: id },
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

// updateCommunity

export const updateCommunity = async (id, name) => {
  try {
    const community = await Community.update(
      { name: name },
      { where: { id: id } }
    );

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
      attributes: ["id", "name"],
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
