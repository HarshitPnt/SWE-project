import { User } from "../../models/userModel.js";
import fs from "fs";
import { Op } from "sequelize";

const filename = "./logs/db.log";

// getUserById
export const getUserById = async (id) => {
  try {
    if (id <= 0) {
      throw { error: null, msg: "Invalid id" };
    }
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    // logging the user
    fs.appendFileSync(filename, `getUserById: ${user}\n`);
    // console.log(user);

    // check if user is null
    if (user === null) {
      throw { error: null, msg: "User not found" };
    }
    return user;
  } catch (err) {
    console.log(err);
    if (err.msg === "Invalid id" || err.msg === "User not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getUserById" };
  }
};

// getUserByUsername
export const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ where: { username: username } });

    // logging the user
    fs.appendFileSync(filename, `getUserByUsername: ${user}\n`);
    if (user === null) {
      throw { error: null, msg: "User not found" };
    }
    return user;
  } catch (err) {
    // console.log(err);
    if (err.msg === "User not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getUserByUsername" };
  }
};

// getUserByEmail
export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      where: { email: email },
    });

    // logging the user
    fs.appendFileSync(filename, `getUserByEmail: ${user}\n`);
    if (user === null) {
      throw { error: null, msg: "User not found" };
    }
    return user;
  } catch (err) {
    if (err.msg === "User not found") {
      throw err;
    }
    throw { error: err, msg: "Error in getUserByEmail" };
  }
};

// createUser
export const createUser = async (username, email) => {
  try {
    if (username == "" || username == null || email == "" || email == null) {
      throw { error: null, msg: "Invalid username or email" };
    }
    const user = await User.create({
      username: username,
      email: email,
    });

    // logging the user
    fs.appendFileSync(filename, `createUser: ${user}\n`);
    return "User created successfully";
  } catch (err) {
    console.log(err);
    if (err.msg === "Invalid username or email") {
      throw err;
    }
    if (err.name === "SequelizeUniqueConstraintError") {
      throw { error: err.name, msg: "Username already exists" };
    }
    throw { error: err, msg: "Error in createUser" };
  }
};

// updateUser
export const updateUser = async (id, data) => {
  data.updated_at = Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
  delete data.created_at;
  delete data.id;
  delete data.username;
  delete data.email;

  try {
    if (id <= 0) {
      throw { error: null, msg: "Invalid id" };
    }
    let user = await User.update(data, {
      where: { id: id },
    });

    // logging the user
    if (user[0] === 0) {
      throw { error: null, msg: "User not found" };
    }
    fs.appendFileSync(filename, `updateUser: ${user}\n`);
    return "User updated successfully";
  } catch (err) {
    if (err.msg === "Invalid id" || err.msg === "User not found") {
      throw err;
    }
    throw { error: err, msg: "Error in updateUser" };
  }
};

// getAllUsers
export const getAllUsers = async () => {
  try {
    const users = await User.findAll();

    // logging the user
    fs.appendFileSync(filename, `getAllUsers: ${users}\n`);

    return users;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getAllUsers" };
  }
};

// searchUser
export const searchUser = async (searchString) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"],
      where: {
        username: {
          [Op.iLike]: searchString + "%",
        },
      },
    });

    // logging the user
    fs.appendFileSync(filename, `searchUser: ${users}\n`);

    return users;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in searchUser" };
  }
};
