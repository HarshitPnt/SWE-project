import { DataTypes } from "sequelize";

import db from "../../config/database.js";

const SavedPosts = db.define(
  "SavedPosts",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "posts",
        key: "id",
      },
      primaryKey: true,
    },
    saved_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

export default SavedPosts;
