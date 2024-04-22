import { DataTypes } from "sequelize";

import db from "../../config/database.js";

const UserGroup = db.define(
  "UserGroup",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: "group_conversations",
        key: "id",
      },
      primaryKey: true,
    },
    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    leftAt: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
      validate: {
        isIn: [["active", "left", "removed"]],
      },
    },
  },
  {
    timestamps: false,
  }
);

export default UserGroup;
