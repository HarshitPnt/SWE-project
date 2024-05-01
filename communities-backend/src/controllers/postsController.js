import * as PostDB from "../controllers/db/posts.js";
import {
  getPublicPosts,
  getMemberPosts,
} from "../utils/PostsFilter/filterByVisibility.js";
import { checkFields, retainFields } from "../utils/utilities/object.js";
import * as UserDB from "../controllers/db/user.js";
import * as CommunityDB from "../controllers/db/community.js";
import { CommunityUser } from "../models/communityUserModel.js";
import { Votes } from "../models/votesModel.js";

// getPostById (public: tested)
export const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id <= 0) throw { error: null, msg: "Invalid id" };
    let post = await PostDB.getPostById(id, "none");
    if (!req.verified) post = await getPublicPosts([post]);
    else post = await getMemberPosts([post], req.username);
    let posts = [];
    // iterate over each post and get votes
    for (let i = 0; i < post.length; i++) {
      const upvotes = await Votes.count({
        where: { parent_id: `p_${post[i].id}`, vote_type: 0 },
      });
      const downvotes = await Votes.count({
        where: { parent_id: `p_${post[i].id}`, vote_type: -1 },
      });
      posts.push({
        post: post[i],
        upvotes: upvotes,
        downvotes: downvotes,
      });
    }
    console.log(posts);
    res.status(200).json(posts[0]);
  } catch (err) {
    console.log(err);
    if (err.msg === "Invalid id" || err.msg === "Post not found") {
      res.status(404).json({ msg: "Post not found" });
      return;
    }
    res.status(500).json({ msg: "Error in getPostById" });
  }
};

// getPostByCreatorID
export const getPostByCreatorID = async (req, res) => {
  try {
    const creator_id = req.params.creator_id;
    console.log(creator_id);
    let post = await PostDB.getPostByCreatorID(creator_id, "none");
    if (!req.verified) post = await getPublicPosts(post);
    else post = await getMemberPosts(post, req.username);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    if (err.msg === "Invalid banned value") {
      res.status(400).json({ msg: "Invalid banned value" });
      return;
    } else if (err.msg === "Post not found") {
      res.status(404).json({ msg: "Post not found" });
      return;
    }
    res.status(500).json({ msg: "Error in getPostByCreatorID" });
  }
};
// getAllPostsByCommunityID
export const getAllPostsByCommunityID = async (req, res) => {
  try {
    const community_id = req.params.community_id;
    let post = await PostDB.getPostByCommunityID2(community_id, "none");
    let posts = [];
    // for each post get user and community details
    for (let i = 0; i < post.length; i++) {
      const user = await UserDB.getUserById(post[i].creator_id);
      const upvotes = await Votes.count({
        where: { parent_id: `p_${post[i].id}`, vote_type: 0 },
      });
      const downvotes = await Votes.count({
        where: { parent_id: `p_${post[i].id}`, vote_type: -1 },
      });
      const community = await CommunityDB.getCommunityById(
        post[i].community_id
      );
      posts.push({
        post: post[i],
        user: user,
        community: community,
        upvotes: upvotes,
        downvotes: downvotes,
      });
    }
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    if (err.msg === "Invalid banned value") {
      res.status(400).json({ msg: "Invalid banned value" });
      return;
    } else if (err.msg === "Post not found") {
      res.status(404).json({ msg: "Post not found" });
      return;
    }
    res.status(500).json({ msg: "Error in getPostByCommunityID" });
  }
};

// getPostByCommunityID
export const getPostByCommunityID = async (req, res) => {
  try {
    const community_id = req.params.community_id;
    let post = await PostDB.getPostByCommunityID(community_id, "none");
    if (!req.verified) post = await getPublicPosts(post);
    else post = await getMemberPosts(post, req.username);
    console.log(post);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    if (err.msg === "Invalid banned value") {
      res.status(400).json({ msg: "Invalid banned value" });
      return;
    } else if (err.msg === "Post not found") {
      res.status(404).json({ msg: "Post not found" });
      return;
    }
    res.status(500).json({ msg: "Error in getPostByCommunityID" });
  }
};

// getPost
export const searchPosts = async (req, res) => {
  try {
    const user = req.query.user;
    const community = req.query.community;
    const search = req.query.search;
    console.log(user, community, search);
    let post;
    post = await PostDB.searchPost(user, community, search);
    if (!req.verified) post = await getPublicPosts(post);
    else post = await getMemberPosts(post, req.username);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    if (err.msg == "Invalid search") {
      res.status(400).json({ msg: "Invalid search" });
      return;
    }
    res.status(500).json({ msg: "Error in getPost" });
  }
};

// createPost
export const createPost = async (req, res) => {
  try {
    let data = req.body.data;
    if (!req.body.data) {
      res.status(400).json({ msg: "Missing data" });
      return;
    }
    // check if data contains the following fields
    const requiredFields = [
      "title",
      "content",
      "community_id",
      "username",
      "post_type",
    ];
    // get id

    // from post_type check others also (TODO)
    if (checkFields(data, requiredFields) === false) {
      res.status(400).json({ msg: "Missing fields" });
      return;
    }
    let user = await UserDB.getUserByUsername(data.username);
    if (user.is_banned === true) {
      res.status(400).json({ msg: "User is banned" });
      return;
    }
    // check if user is active in community
    const comm = await CommunityUser.findOne({
      where: { user_id: user.id, community_id: data.community_id },
    });
    console.log("HEERERE");
    if (comm.status !== "active" || comm.privileges[0] != 1) {
      res.status(403).json({ msg: "User not in community" });
      return;
    }
    console.log(data, user.id);
    const post = await PostDB.createPost({
      creator_id: user.id,
      title: data.title,
      content: data.content,
      community_id: data.community_id,
      post_type: data.post_type,
      created_at: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
      updated_at: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    });
    res.status(201).json({ msg: "Post created", id: post.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in createPost" });
  }
};

// updatePost
export const updatePost = async (req, res) => {
  try {
    console.log("HERE");
    const id = req.params.id;
    let data = req.body.data;
    if (!req.body.data) {
      res.status(400).json({ msg: "Missing data" });
      return;
    }
    data.updated_at = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const post = await PostDB.updatePost(id, data);
    res.status(200).json({ msg: "Post updated" });
  } catch (err) {
    console.log(err);
    if (err.msg === "Post not found") {
      res.status(404).json({ msg: "Post not found" });
      return;
    }
    res.status(500).json({ msg: "Error in updatePost" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await PostDB.deletePost(id);
    res.status(200).json({ msg: "Post deleted" });
  } catch (err) {
    console.log(err);
    if (err.msg === "Post not found") {
      res.status(404).json({ msg: "Post not found" });
      return;
    }
    res.status(500).json({ msg: "Error in deletePost" });
  }
};
