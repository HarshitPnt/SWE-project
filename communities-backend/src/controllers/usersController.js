import { User } from "../models/userModel.js";
import * as UserDB from "../controllers/db/user.js";

// getUser
export const getPublicUser = async (req, res) => {
  try {
    const query = req.params;
    console.log(query);
    let user = null;
    if (query.id) {
      user = await UserDB.getUserById(query.id);
    } else if (query.username) {
      user = await UserDB.getUserByUsername(query.username);
    } else if (query.email) {
      user = await UserDB.getUserByEmail(query.email);
    } else {
      res.status(400).json({ msg: "Invalid query" });
    }
    if (user === null) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    if (user.profile_privacy_setting === "private") {
      res.status(403).json({ msg: "User is private" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// getPrivateUser
export const getPrivateUser = async (req, res) => {
  const verification = req.verified;
  const username = req.username;

  const userId = req.params.id;

  try {
    let user = await UserDB.getUserById(userId);
    if (user === null) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    if (user.profile_privacy_setting === "public") {
      res.status(200).json({
        type: "public",
        username: user.username,
        profile_picture: user.profile_picture,
        is_deleted: user.is_deleted,
        is_banned: user.is_banned,
        chat_setting: user.chat_setting,
        bio: user.bio,
        location: user.location,
      });
      return;
    }
    if (verification === false) {
      // TODO( need to add user reports )
      const data = {
        type: "hidden",
        username: user.username,
        profile_picture: user.profile_picture,
        is_deleted: user.is_deleted,
        is_banned: user.is_banned,
        chat_setting: user.chat_setting,
      };
      res.status(200).json(data);
      return;
    }
    if (verification === true && user.username === username) {
      const data = {
        type: "own",
        username: user.username,
        profile_picture: user.profile_picture,
        is_deleted: user.is_deleted,
        is_banned: user.is_banned,
        chat_setting: user.chat_setting,
        bio: user.bio,
        location: user.location,
      };
      res.status(200).json(data);
      return;
    }

    // TODO (need to add user reports and user posts, comments, following, followers, and check friends)
    if (verification === true) {
      const data = {
        type: "visible",
        username: user.username,
        profile_picture: user.profile_picture,
        is_deleted: user.is_deleted,
        is_banned: user.is_banned,
        chat_setting: user.chat_setting,
        bio: user.bio,
        location: user.location,
      };
      res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// ban user
export const banUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const banReason = req.body.reason;
    if (!banReason) {
      res.status(400).json({ msg: "Missing ban reason" });
      return;
    }
    const user = await UserDB.getUserById(userId);
    if (user.is_banned === true) {
      res.status(400).json({ msg: "User is already banned" });
      return;
    }
    const _user = await UserDB.updateUser(userId, { is_banned: true });
    res.status(200).json({ msg: "User banned" });
  } catch (err) {
    console.log(err);
    if (err.msg === "User not found") {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.status(500).json(err);
  }
};

// unban user (tested)
export const unbanUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserDB.getUserById(userId);
    if (user.is_banned === false) {
      res.status(400).json({ msg: "User is not banned" });
      return;
    }
    const _user = await UserDB.updateUser(userId, {
      is_banned: false,
      banned_reason: "",
    });
    res.status(200).json({ msg: "User unbanned" });
  } catch (err) {
    console.log(err);
    if (err.msg === "User not found") {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.status(500).json(err);
  }
};

// delete user (TODO)

// update user (tested)
export const updateUser = async (req, res) => {
  try {
    const username = req.username;
    let user = await UserDB.getUserByUsername(username);
    if (user === null) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    const userID = user.id;
    if (!req.body || !req.body.data) {
      res.status(400).json({ msg: "Missing data" });
      return;
    }
    const update = req.body.data;

    user = await UserDB.getUserById(userID);
    if (user === null) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    const _user = await UserDB.updateUser(userID, update);
    res.status(200).json({ msg: "User updated" });
  } catch (err) {
    console.log(err);
    if (err.msg === "User not found") {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.status(500).json(err);
  }
};

// get all banned users (tested)
export const getAllBannedUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id"],
      where: { is_banned: true },
    });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const searchUser = async (req, res) => {
  try {
    const searchString = req.query.user;
    const users = await UserDB.searchUser(searchString);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// communities that the user is a part of (communities)

// user notifications (notifications)

// user posts (posts)

// user profile

// user home feed (services)

// user chat (chat)

// user settings

// user logout

// update user settings

// followers

// following
