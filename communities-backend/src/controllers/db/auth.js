import Authentication from "../../models/authModel";
import { fs } from "fs";

const filename = "./logs/db.log";

// getUserById
export const getUserById = async (id) => {
  try {
    const user = await Authentication.findOne({
      where: {
        id: id,
      },
    });
    fs.appendFileSync(filename, `Auth: getUserById: ${user}\n`);

    return user;
  } catch (err) {
    console.log(err);

    fs.appendFileSync(filename, `Auth: getUserById: ${err}\n`);
    throw { error: err, msg: "Error in getUserById" };
  }
};

// getUserByUsername
export const getUserByUsername = async (username) => {
  try {
    const user = await Authentication.findOne({
      where: { username: username },
    });
    fs.appendFileSync(filename, `Auth: getUserByUsername: ${user}\n`);

    return user;
  } catch (err) {
    console.log(err);

    fs.appendFileSync(filename, `Auth: getUserByUsername: ${err}\n`);
    throw { error: err, msg: "Error in getUserByUsername" };
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
    const user = await Authentication.create({
      username: username,
      email: email,
      password: password,
    });
    fs.appendFileSync(filename, `Auth: createUser: ${user}\n`);
    return user;
  } catch (err) {
    console.log(err);
    fs.appendFileSync(filename, `Auth: createUser: ${err}\n`);
    throw { error: err, msg: "Error in createUser" };
  }
};

// updateUserById
export const updateUserPassword = async (id, password) => {
  try {
    const user = await Authentication.update(
      { password: password },
      {
        where: {
          id: id,
        },
      }
    );
    fs.appendFileSync(filename, `Auth: updateUser: ${user}\n`);
    return user;
  } catch (err) {
    console.log(err);
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
