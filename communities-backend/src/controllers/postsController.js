import * as PostDB from "../controllers/db/posts.js";
import {
  getPublicPosts,
  getMemberPosts,
} from "../utils/PostsFilter/filterByVisibility.js";

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

//
