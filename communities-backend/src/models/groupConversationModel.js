import { DataTypes } from "sequelize";

import db from "../../config/database.js";

const GroupConversation = db.define("group_conversation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creator_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "users", // 'users' refers to table name
      key: "id", // 'id' refers to column name in users table
    },
  },
});

export default GroupConversation;
