import { DataTypes } from "sequelize";

import db from "../../config/database.js";

const Conversations = db.define("conversations", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },
  receiver_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },
  status: {
    type: DataTypes.ENUM,
    values: ["pending", "accepted", "blocked"],
    defaultValue: "pending",
  },
});

export default Conversations;
