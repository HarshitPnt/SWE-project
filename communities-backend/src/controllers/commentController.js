import { Comments } from "../models/commentsModel.js";

const parseCommentTree = (comments) => {
  const commentTree = {};
  comments.forEach((comment) => {
    if (comment.parent_id === "") {
      commentTree[comment.id] = {
        ...comment,
        children: [],
      };
    } else {
      // parent id of form c_1
      let parentId = comment.parent_id.split("_")[1];
      commentTree[parentId].children.push({
        ...comment,
        children: [],
      });
    }
  });
  return commentTree;
};

export const getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.id;
    let comments = await Comments.findAll({
      attributes: ["id", "content", "parent_id", "created_at"],
      where: { post_id: postId },
      sort: [["created_at", "ASC"]],
    });
    comments = comments.map((comment) => {
      return {
        id: comment.id,
        text: comment.content,
        parentId:
          comment.parent_id != ""
            ? comment.parent_id.split("_")[1]
            : comment.parent_id,
        created_at: comment.created_at,
      };
    });
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getCommentsByPostId" });
  }
};
