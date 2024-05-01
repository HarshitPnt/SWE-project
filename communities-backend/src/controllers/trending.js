import { Post } from "../models/postsModel.js";
import { getPublicPosts } from "../utils/PostsFilter/filterByVisibility.js";
import { Op } from "sequelize";
import { User } from "../models/userModel.js";
import { Votes } from "../models/votesModel.js";

export const getTrendingPosts = async (req, res) => {
  try {
    // get random public posts
    let posts = await Post.findAll({
      attributes: [
        "id",
        "creator_id",
        "community_id",
        "title",
        "content",
        "post_type",
        "image",
        "video",
      ],
      limit: 100,
      where: {
        id: {
          [Op.gt]: Math.floor(Math.random() * 1000),
        },
        content: { [Op.ne]: "[removed]" },
      },
    });
    posts = await getPublicPosts(posts);
    let postsArray = [];
    // get votes for each post
    for (let i = 0; i < posts.length; i++) {
      const upvotes = await Votes.count({
        where: { parent_id: `p_${posts[i].id}`, vote_type: 0 },
      });
      const downvotes = await Votes.count({
        where: { parent_id: `p_${posts[i].id}`, vote_type: -1 },
      });
      postsArray.push({
        post: posts[i],
        upvotes: upvotes,
        downvotes: downvotes,
      });
    }
    res.status(200).json(postsArray);
  } catch (err) {
    console.log(err);
  }
};
