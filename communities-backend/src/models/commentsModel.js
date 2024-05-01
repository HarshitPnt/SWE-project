import { DataTypes } from "sequelize";

import db from "../../config/database.js";

export const Comments = db.define(
  "comments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "posts",
        key: "id",
      },
    },
    parent_id: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        is: {
          args: ["^c_"],
          msg: "parent_id must start with 'c_'",
        },
      },
    },
    is_banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_deleted: {
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
  },
  {
    tableName: "comments",
    timestamps: false,
  }
);
