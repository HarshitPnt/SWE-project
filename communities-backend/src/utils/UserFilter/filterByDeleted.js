import { User } from "../../models/userModel.js";
import * as UserDB from "../../controllers/db/user.js";

export const getActiveUsers = async (id_list) => {
  try {
    const users = await User.findAll({
      attributes: ["id"],
      where: {
        id: id_list,
        is_deleted: false,
      },
    });
    return users;
  } catch (err) {
    console.log(err);
    throw { error: err, msg: "Error in getActiveUsers" };
  }
};
