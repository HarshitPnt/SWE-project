import { Post } from "../../models/postsModel.js";
import { User } from "../../models/userModel.js";
import fs from "fs";

const filename = "./logs/db.log";

// check if user is creator of post

export const checkPostCreator = async (req, res, next) => {
  try {
    const post_id = req.params.id;
    if (!req.verified) {
      res.status(403).json({ msg: "Invalid Token" });
      return;
    }
    const username = req.username;
    const post = await Post.findOne({
      where: { id: post_id, deleted_at: null },
    });
    if (post === null) {
      res.status(404).json({ msg: "Post not found" });
      return;
    }
    const user = await User.findOne({ where: { username: username } });
    if (post.creator_id === user.id) {
      next();
    } else {
      res.status(403).json({ msg: "User is not creator of post" });
    }
  } catch (err) {
    console.log(err);
    if (
      err.msg === "User not found" ||
      err.msg === "Post not found" ||
      err.msg === "Invalid Token"
    ) {
      res.status(404).json({ msg: err.msg });
      return;
    }
    res.status(500).json({ msg: "Error in checkPostCreator" });
  }
};

// check Post privileges
