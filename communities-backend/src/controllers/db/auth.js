import { Authentication } from "../../models/authModel.js";
import fs from "fs";
import * as UserDB from "./user.js";
// import { User } from "../../models/userModel.js";

const filename = "./logs/db.log";

// getUserById
export const getUserById = async (id) => {
  try {
    if (id <= 0) {
      throw { error: null, msg: "Invalid Id" };
    }
    const user = await Authentication.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw { error: null, msg: "User not found" };
    }
    fs.appendFileSync(filename, `Auth: getUserById: ${user}\n`);

    return user;
  } catch (err) {
    console.log(err);

    fs.appendFileSync(filename, `Auth: getUserById: ${err}\n`);
    throw { error: err.error, msg: err.msg };
  }
};

// getUserByUsername
export const getUserByUsername = async (username) => {
  try {
    const user = await Authentication.findOne({
      where: { username: username },
    });
    fs.appendFileSync(filename, `Auth: getUserByUsername: ${user}\n`);
    if (!user) {
      throw { error: null, msg: "User not found" };
    }
    return user;
  } catch (err) {
    console.log(err);

    fs.appendFileSync(filename, `Auth: getUserByUsername: ${err}\n`);
    throw { error: err.error, msg: err.msg };
  }
};

// getUserByEmail
export const getUserByEmail = async (email) => {
  try {
    const user = await Authentication.findOne({
      where: {
        email: email,
      },
    });

    fs.appendFileSync(filename, `Auth: getUserByEmail: ${user}\n`);
    return user;
  } catch (err) {
    console.log(err);

    fs.appendFileSync(filename, `Auth: getUserByEmail: ${err}\n`);
    throw { error: err, msg: "Error in getUserByEmail" };
  }
};

// createUser
export const createUser = async (username, email, password) => {
  try {
    if (!username || !email) {
      throw { name: "NoUsername", msg: "Invalid username or email" };
    }
    // check if user in users table

    let user = await UserDB.getUserByUsername(username);
    console.log(username);
    console.log(user);
    if (user == null) {
      throw { name: "NotInUsers", msg: "User not in users table" };
    }
    user = user.toJSON();
    if (user.email != email) {
      throw { name: "EmailNotMatched", msg: "Email not matched" };
    }
    user = await Authentication.create({
      username: username,
      email: email,
      password: password,
    });
    fs.appendFileSync(filename, `Auth: createUser: ${user}\n`);
    return "User created successfully";
  } catch (err) {
    fs.appendFileSync(filename, `Auth: createUser: ${err}\n`);
    console.log(err);
    if (err.msg == "User not found")
      throw { error: null, msg: "User not in users table" };
    else if (err.name == "SequelizeUniqueConstraintError")
      throw { error: err.name, msg: "User already exists" };
    else if (err.name == "NoUsername")
      throw { error: null, msg: "Invalid username or email" };
    else if (err.name == "EmailNotMatched")
      throw { error: null, msg: "Email not matched" };
    else throw { error: err, msg: "Error in createUser" };
  }
};

// updateUserById
export const updateUserPassword = async (username, password) => {
  try {
    if (!password) {
      throw { error: null, msg: "Invalid Password" };
    }
    const user = await Authentication.update(
      { password: password },
      {
        where: {
          username: username,
        },
      }
    );
    fs.appendFileSync(filename, `Auth: updateUser: ${user}\n`);
    if (user[0] == 0) {
      throw { error: null, msg: "User not found" };
    }
    return user;
  } catch (err) {
    console.log(err);
    if (err.msg == "User not found")
      throw { error: null, msg: "User not found" };
    else if (err.msg == "Invalid Password")
      throw { error: null, msg: "Invalid Password" };
    fs.appendFileSync(filename, `Auth: updateUser: ${err}\n`);
    throw { error: err, msg: "Error in updateUser" };
  }
};

// deleteUserById
export const deleteUser = async (id) => {
  try {
    const user = await Authentication.destroy({
      where: {
        id: id,
      },
    });
    fs.appendFileSync(filename, `Auth: deleteUser: ${user}\n`);
    return user;
  } catch (err) {
    console.log(err);
    fs.appendFileSync(filename, `Auth: deleteUser: ${err}\n`);
    throw { error: err, msg: "Error in deleteUser" };
  }
};
