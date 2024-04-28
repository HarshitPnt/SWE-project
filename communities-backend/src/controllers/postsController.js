import * as PostDB from "../controllers/db/posts.js";
import {
  getPublicPosts,
  getMemberPosts,
} from "../utils/PostsFilter/filterByVisibility.js";
import { checkFields, retainFields } from "../utils/utilities/object.js";

// getPostById (public: tested)
export const getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id <= 0) throw { error: null, msg: "Invalid id" };
    let post = await PostDB.getPostById(id, "none");
    if (!req.verified) post = await getPublicPosts([post]);
    else post = await getMemberPosts([post], req.username);
    console.log(post);
    res.status(200).json(post);
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

// getPostByCommunityID
export const getPostByCommunityID = async (req, res) => {
  try {
    const community_id = req.params.community_id;
    let post = await PostDB.getPostByCommunityID(community_id, "none");
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
    const data = req.body.data;
    if (!req.body.data) {
      res.status(400).json({ msg: "Missing data" });
      return;
    }
    // check if data contains the following fields
    const requiredFields = [
      "title",
      "content",
      "community_id",
      "creator_id",
      "post_type",
    ];
    // from post_type check others also (TODO)
    if (checkFields(data, requiredFields) === false) {
      res.status(400).json({ msg: "Missing fields" });
      return;
    }
    const post = await PostDB.createPost(data);
    res.status(201).json({ msg: "Post created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in createPost" });
  }
};

// updatePost
export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    let data = req.body.data;
    if (!req.body.data) {
      res.status(400).json({ msg: "Missing data" });
      return;
    }
    data = retainFields(data, ["title", "content"]);
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
