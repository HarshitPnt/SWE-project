import { Community } from "../../models/communityModel.js";
import { Moderators } from "../../models/moderatorsModel.js";

// getModByUserId
export const getModByUserId = async (userId) => {
  try {
    let data = [];
    const mod = await Moderators.findAll({
      attributes: ["community_id", "privileges"],
      where: {
        user_id: userId,
      },
    });
    // get community name for each community id
    for (let i = 0; i < mod.length; i++) {
      const community = await Community.findOne({
        attributes: ["name"],
        where: {
          id: mod[i].community_id,
        },
      });
      data.push({
        community_id: mod[i].community_id,
        name: community.name,
        privileges: mod[i].privileges,
      });
    }
    return data;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getModByUserId" };
  }
};

// getModByCommunityId
export const getModByCommunityId = async (communityId) => {
  try {
    const mod = await Moderators.findAll({
      attributes: ["user_id", "privileges"],
      where: {
        community_id: communityId,
      },
    });

    if (mod === null) {
      throw { error: null, msg: "Moderator not found" };
    }
    return mod;
  } catch (err) {
    console.log(err);
    if (err.msg === "Moderator not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getModByCommunityId" };
  }
};

// addMod
export const addMod = async (userId, communityId, privileges = "00000000") => {
  try {
    // if mod already exists and is deleted_at then update it
    let mod = await Moderators.findOne({
      attributes: ["deleted_at"],
      where: {
        user_id: userId,
        community_id: communityId,
      },
    });

    if (mod !== null && mod.deleted_at !== null) {
      mod = await Moderators.update(
        {
          deleted_at: null,
          privileges: privileges,
          created_at: new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          }),
          updated_at: new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          }),
        },
        {
          where: {
            user_id: userId,
            community_id: communityId,
          },
        }
      );
      mod = await Moderators.create({
        user_id: userId,
        community_id: communityId,
        privileges: privileges,
      });
    } else {
      console.log("HERE");
      mod = await Moderators.create({
        user_id: userId,
        community_id: communityId,
        privileges: privileges,
      });
    }
    return mod;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in addMod" };
  }
};

// removeMod
export const removeMod = async (userId, communityId) => {
  try {
    const mod = await Moderators.update(
      {
        deleted_at: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
      },
      {
        where: {
          user_id: userId,
          community_id: communityId,
        },
      }
    );
    return mod;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in removeMod" };
  }
};

// updateMod
export const updateMod = async (userId, communityId, privileges) => {
  try {
    const mod = await Moderators.update(
      { privileges: privileges },
      {
        where: {
          user_id: userId,
          community_id: communityId,
        },
      }
    );
    return mod;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in updateMod" };
  }
};
