import { Post } from "../../models/postsModel.js";
import fs from "fs";
import { Op } from "sequelize";
import * as UserDB from "./user.js";
import * as CommunityDB from "./community.js";
import { retainFields } from "../../utils/utilities/object.js";

const filename = "./logs/db.log";

// getPostById
export const getPostById = async (id, banned = "none") => {
  try {
    if (id <= 0) {
      throw { error: null, msg: "Invalid id" };
    }
    let post;
    if (banned == "all") {
      post = await Post.findOne({
        where: {
          id: id,
          deleted_at: null,
        },
      });
    } else if (banned == "none") {
      post = await Post.findOne({
        where: {
          id: id,
          is_banned: false,
          deleted_at: null,
        },
      });
    } else {
      throw { error: null, msg: "Invalid banned value" };
    }

    // logging the post
    fs.appendFileSync(filename, `getPostById: ${post}\n`);
    // console.log(post);

    // check if post is null
    if (post === null) {
      throw { error: null, msg: "Post not found" };
    }
    return post;
  } catch (err) {
    console.log(err);
    if (err.msg === "Invalid id" || err.msg === "Post not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getPostById" };
  }
};

// getPostByCreatorID

export const getPostByCreatorID = async (creator_id, banned = "none") => {
  try {
    let post;
    if (banned == "all") {
      post = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: { creator_id: creator_id, deleted_at: null },
      });
    } else if (banned == "none") {
      post = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: { creator_id: creator_id, is_banned: false, deleted_at: null },
      });
    } else if (banned == "only") {
      post = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: { creator_id: creator_id, is_banned: true, deleted_at: null },
      });
    } else {
      throw { error: null, msg: "Invalid banned value" };
    }
    // logging the post
    fs.appendFileSync(filename, `getPostByCreatorID: ${post}\n`);
    return post;
  } catch (err) {
    // console.log(err);
    if (err.msg === "Post not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getPostByCreatorID" };
  }
};

export const getPostByCommunityID2 = async (community_id, banned = "none") => {
  try {
    let post;
    if (banned == "all") {
      post = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: { community_id: community_id, deleted_at: null },
      });
    } else if (banned == "none") {
      post = await Post.findAll({
        attributes: ["id", "creator_id", "community_id", "content", "title"],
        where: {
          community_id: community_id,
          is_banned: false,
          deleted_at: null,
        },
      });
    } else if (banned == "only") {
      post = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          community_id: community_id,
          is_banned: true,
          deleted_at: null,
        },
      });
    } else {
      throw { error: null, msg: "Invalid banned value" };
    }
    // logging the post
    fs.appendFileSync(filename, `getPostByCommunityID: ${post}\n`);
    return post;
  } catch (err) {
    // console.log(err);
    if (err.msg === "Post not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getPostByCommunityID" };
  }
};

// getPostByCommunityID

export const getPostByCommunityID = async (community_id, banned = "none") => {
  try {
    let post;
    if (banned == "all") {
      post = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: { community_id: community_id, deleted_at: null },
      });
    } else if (banned == "none") {
      post = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          community_id: community_id,
          is_banned: false,
          deleted_at: null,
        },
      });
    } else if (banned == "only") {
      post = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          community_id: community_id,
          is_banned: true,
          deleted_at: null,
        },
      });
    } else {
      throw { error: null, msg: "Invalid banned value" };
    }
    // logging the post
    fs.appendFileSync(filename, `getPostByCommunityID: ${post}\n`);
    return post;
  } catch (err) {
    // console.log(err);
    if (err.msg === "Post not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getPostByCommunityID" };
  }
};

// getPostByCommunityAndCreatorID

export const getPostByCommunityAndCreatorID = async (
  community_id,
  creator_id,
  banned = "none"
) => {
  try {
    let post;
    if (banned == "all") {
      post = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          community_id: community_id,
          creator_id: creator_id,
          deleted_at: null,
        },
      });
    } else if (banned == "none") {
      post = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          community_id: community_id,
          creator_id: creator_id,
          is_banned: false,
          deleted_at: null,
        },
      });
    } else if (banned == "only") {
      post = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          community_id: community_id,
          creator_id: creator_id,
          is_banned: true,
          deleted_at: null,
        },
      });
    } else {
      throw { error: null, msg: "Invalid banned value" };
    }
    // logging the post
    fs.appendFileSync(filename, `getPostByCommunityAndCreatorID: ${post}\n`);
    return post;
  } catch (err) {
    // console.log(err);
    if (err.msg === "Post not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getPostByCommunityAndCreatorID" };
  }
};

// searchPost

export const searchPost = async (user, community, content) => {
  try {
    if (!user && !community && !content) {
      throw { error: null, msg: "Invalid search" };
    }
    let posts;
    if (user && community && content) {
      const users = await UserDB.searchUser(user);
      const communities = await CommunityDB.searchCommunity(community);
      posts = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          creator_id: users.map((user) => user.id),
          community_id: communities.map((community) => community.id),
          [Op.or]: [
            { content: { [Op.iLike]: "% " + content + " %" } },
            { title: { [Op.iLike]: "% " + content + " %" } },
          ],
          deleted_at: null,
        },
      });
    } else if (user && community) {
      const users = await UserDB.searchUser(user);
      const communities = await CommunityDB.searchCommunity(community);
      posts = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          creator_id: users.map((user) => user.id),
          community_id: communities.map((community) => community.id),
          deleted_at: null,
        },
      });
    } else if (user && content) {
      const users = await UserDB.searchUser(user);
      posts = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          creator_id: users.map((user) => user.id),
          [Op.or]: [
            { content: { [Op.iLike]: "%" + content + "%" } },
            { title: { [Op.iLike]: "%" + content + "%" } },
          ],
          deleted_at: null,
        },
      });
    } else if (community && content) {
      const communities = await CommunityDB.searchCommunity(community);
      posts = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          community_id: communities.map((community) => community.id),
          [Op.or]: [
            { content: { [Op.iLike]: "%" + content + "%" } },
            { title: { [Op.iLike]: "%" + content + "%" } },
          ],
          deleted_at: null,
        },
      });
    } else if (user) {
      const users = await UserDB.searchUser(user);
      posts = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          creator_id: users.map((user) => user.id),
          deleted_at: null,
        },
      });
    } else if (community) {
      const communities = await CommunityDB.searchCommunity(community);
      posts = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          community_id: communities.map((community) => community.id),
          deleted_at: null,
        },
      });
    } else if (content) {
      posts = await Post.findAll({
        attributes: ["id", "creator_id", "community_id"],
        where: {
          [Op.or]: [
            { content: { [Op.iLike]: "%" + content + "%" } },
            { title: { [Op.iLike]: "%" + content + "%" } },
          ],
          deleted_at: null,
        },
      });
    } else {
      throw { error: null, msg: "Invalid search" };
    }
    return posts;
  } catch (err) {
    console.log(err);
    if (err.msg === "Post not found") {
      throw err;
    }
    throw { error: err, msg: "Error in searchPost" };
  }
};

// createPost

export const createPost = async (data) => {
  try {
    // check if data contains the following fields
    const requiredFields = ["title", "content", "community_id", "creator_id"];
    requiredFields.forEach((field) => {
      if (!data[field]) {
        throw { error: null, msg: "Missing data" };
      }
    });
    const post = await Post.create(data);
    // logging the post
    fs.appendFileSync(filename, `createPost: ${post}\n`);
    return post;
  } catch (err) {
    // console.log(err);
    throw { error: err, msg: "Error in createPost" };
  }
};

// updatePost
export const updatePost = async (id, data) => {
  try {
    // check if data contains the following fields
    data = retainFields(data, ["title", "content"]);
    if (!data) {
      throw { error: null, msg: "Missing data" };
    }
    const post = await Post.update(data, {
      where: {
        id: id,
        deleted_at: null,
      },
    });
    if (post[0] === 0) {
      throw { error: null, msg: "Post not found" };
    }
    // logging the post
    fs.appendFileSync(filename, `updatePost: ${post}\n`);
    return post;
  } catch (err) {
    // console.log(err);
    if (err.msg === "Post not found") {
      throw { msg: err.msg };
    }
    throw { error: err, msg: "Error in updatePost" };
  }
};

// deletePost
export const deletePost = async (id) => {
  try {
    const post = await Post.update(
      {
        deleted_at: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        }),
      },
      {
        where: {
          id: id,
          deleted_at: null,
        },
      }
    );
    if (post[0] === 0) {
      throw { error: null, msg: "Post not found" };
    }
    // logging the post
    fs.appendFileSync(filename, `deletePost: ${post}\n`);
    return post;
  } catch (err) {
    // console.log(err);
    if (err.msg === "Post not found") {
      throw { msg: err.msg };
    }
    throw { error: err, msg: "Error in deletePost" };
  }
};
