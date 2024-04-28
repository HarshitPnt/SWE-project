import { Post } from "../../models/postsModel.js";
import fs from "fs";
import { Op } from "sequelize";
import * as UserDB from "../../controllers/db/user.js";
import * as CommunityDB from "../../controllers/db/community.js";

// (TODO: implement membership function)
const blocked = async (blocer_id, blocked_id) => {};

const membership = async (commuities, user_id) => {
  //
};

export const getPublicPosts = async (posts) => {
  // each post has a community_id
  // each community has a visibility
  // if the community is public, the post is public
  // console.log(posts);
  const communities = posts.map((post) => {
    return post.community_id;
  });
  let visibilities = await CommunityDB.getCommunityVisibilityByIDs(communities);
  visibilities = visibilities.map((visibility) => visibility.dataValues);
  // console.log(visibilities);
  const publicPosts = posts.filter((post) => {
    const visibility = visibilities.find((v) => v.id === post.community_id);
    // console.log(visibility.visibility, visibility.status);
    return visibility.visibility === "public" && visibility.status === "active";
  });
  return publicPosts;
};

export const getMemberPosts = (posts, username) => {
  const communities = posts.map((post) => {
    return post.community_id;
  });
  const user = UserDB.getUserByUsername(username);
  const user_id = user.id;
  const visibilities = CommunityDB.getCommunityVisibilityByIDs(communities);
  const memberships = membership(communities, user_id);
  const memberPosts = posts.filter((post) => {
    if (
      visibilities[post.community_id].visibility === "public" &&
      visibilities[post.community_id].status === "active"
    )
      return true;
    if (memberships[post.community_id]) return true;
    return false;
  });
  return memberPosts;
};
