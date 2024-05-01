import { Votes } from "../models/votesModel.js";
import { User } from "../models/userModel.js";

export const getVotesByPostId = async (req, res) => {
  try {
    const postId = "p_" + req.params.post_id;
    const upvotes = await Votes.count({ where: { post_id: postId, vote: 0 } });
    const downvotes = await Votes.count({
      where: { post_id: postId, vote: -1 },
    });
    const score = upvotes - downvotes;
    res.status(200).json({ upvotes, downvotes, score });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getVotesByPostId" });
  }
};

export const getVotesByPollId = async (req, res) => {
  try {
    const pollId = "v_" + req.params.poll_id;
    const votes = await Votes.findAll({ where: { post_id: pollId } });
    const score = upvotes - downvotes;
    res.status(200).json(votes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in getVotesByPollId" });
  }
};

export const createVoteByPostId = async (req, res) => {
  try {
    const postId = "p_" + req.params.post_id;
    if (!req.verified) {
      res.status(200).json({ msg: "Unauthorized" });
      return;
    }
    let userId = req.username;
    // get userId from User model
    userId = await User.findOne({ where: { username: userId } });
    userId = userId.id;
    const vote = req.body.vote;
    //if vote alrady exists
    const voteExists = await Votes.findOne({
      where: { post_id: postId, user_id: userId },
    });
    if (voteExists) {
      await Votes.update(
        { vote_type: vote },
        { where: { parent_id: postId, creator_id: userId } }
      );
      res.status(200).json("voted");
      return;
    }
    const voteObj = await Votes.create({
      parent_id: postId,
      creator_id: userId,
      vote_type: vote,
    });
    res.status(200).json("voted");
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in createVoteByPostId" });
  }
};

export const createVoteByPollId = async (req, res) => {
  try {
    const pollId = "v_" + req.params.poll_id;
    if (!req.verified) {
      res.status(200).json({ msg: "Unauthorized" });
      return;
    }
    let userId = req.username;
    // get userId from User model
    userId = await User.findOne({ where: { username: userId } });
    userId = userId.id;
    const vote = req.body.vote;
    //if vote alrady exists
    const voteExists = await Votes.findOne({
      where: { parent_id: pollId, creator_id: userId },
    });
    if (voteExists) {
      await Votes.update(
        { vote_type: vote },
        { where: { parent_id: pollId, creator_id: userId } }
      );
      res.status(200).json("voted");
      return;
    }
    const voteObj = await Votes.create({
      parent_id: pollId,
      creator_id: userId,
      vote_type: vote,
    });
    res.status(200).json("voted");
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error in createVoteByPollId" });
  }
};
