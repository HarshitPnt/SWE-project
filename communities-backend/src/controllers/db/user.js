import { User } from "../../models/userModel.js";
import fs from "fs";

const filename = "./logs/db.log";

// getUserById
export const getUserById = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    // logging the user
    fs.appendFileSync(filename, `getUserById: ${user}\n`);
    // console.log(user);
    return user;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getUserById" };
  }
};

// getUserByUsername
export const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ where: { username: username } });

    // logging the user
    fs.appendFileSync(filename, `getUserByUsername: ${user}\n`);

    return user;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getUserByUsername" };
  }
};

// getUserByEmail
export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({
      email: email,
    });

    // logging the user
    fs.appendFileSync(filename, `getUserByEmail: ${user}\n`);

    return user;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getUserByEmail" };
  }
};

// createUser
export const createUser = async (username, email) => {
  try {
    const user = await User.create({
      username: username,
      email: email,
    });

    // logging the user
    fs.appendFileSync(filename, `createUser: ${user}\n`);

    return user;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in createUser" };
  }
};

// updateUser
export const updateUser = async (id, data) => {
  // update updated_at in IST
  data.updated_at = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  try {
    const user = await User.update(data, {
      where: { id: id },
    });

    // logging the user
    fs.appendFileSync(filename, `updateUser: ${user}\n`);

    return user;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in updateUser" };
  }
};

// deleteUser
export const deleteUser = async (id) => {
  try {
    const user = await User.destroy({
      where: { id: id },
    });

    // logging the user
    fs.appendFileSync(filename, `deleteUser: ${user}\n`);

    return user;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in deleteUser" };
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
