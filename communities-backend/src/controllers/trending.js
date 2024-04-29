import { Post } from "../models/postsModel.js";
import { getPublicPosts } from "../utils/PostsFilter/filterByVisibility.js";
import { Op } from "sequelize";
import { User } from "../models/userModel.js";

export const getTrendingPosts = async (req, res) => {
  try {
    // get random public posts
    let posts = await Post.findAll({
      attributes: ["id", "creator_id", "community_id", "title", "content"],
      limit: 100,
      where: {
        id: {
          [Op.gt]: Math.floor(Math.random() * 1000),
        },
      },
    });
    posts = await getPublicPosts(posts);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};
