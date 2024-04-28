import { DataTypes } from "sequelize";

import db from "../../config/database.js";

export const Community = db.define(
  "communities",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "",
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
    is_banned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    banned_reason: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
    visibility: {
      type: DataTypes.STRING,
      defaultValue: "public",
    },
    banner_image: {
      type: DataTypes.STRING,
    },
    post_privilege: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    comment_privilege: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    allowed_posts: {
      type: DataTypes.STRING,
      defaultValue: "11111",
    },
  },
  {
    tableName: "communities",
    timestamps: false,
  }
);

Community.addHook("beforeValidate", (community, options) => {
  if (!["public", "invite", "request"].includes(community.visibility)) {
    throw new Error("Invalid visibility value");
  }

  if (!["active", "banned", "deleted"].includes(community.status)) {
    throw new Error("Invalid status value");
  }
});
