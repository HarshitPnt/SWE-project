import { DataTypes } from "sequelize";

import db from "../../config/database.js";

export const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_superuser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
    },
    chat_setting: {
      type: DataTypes.STRING,
      defaultValue: "everyone",
    },
    profile_privacy_setting: {
      type: DataTypes.STRING,
      defaultValue: "public",
    },
    notification_setting: {
      type: DataTypes.STRING,
      defaultValue: "1111",
    },
    bio: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);
