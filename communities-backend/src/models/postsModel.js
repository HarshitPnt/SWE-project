import { DataTypes } from "sequelize";

import db from "../../config/database.js";

export const Post = db.define(
  "Posts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
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
    deleted_at: {
      type: DataTypes.DATE,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    community_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "communities",
        key: "id",
      },
    },
    is_banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    banned_reason: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    banned_by: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    post_type: {
      type: DataTypes.STRING,
      defaultValue: "text",
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    video: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    poll_question: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    poll_end_at: {
      type: DataTypes.DATE,
    },
    poll_result: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
  },
  {
    timestamps: false,
    tableName: "posts",
  }
);
