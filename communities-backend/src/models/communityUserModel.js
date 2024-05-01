import { DataTypes } from "sequelize";

import db from "../../config/database.js";

export const CommunityUser = db.define(
  "CommunityUser",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    community_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "communities",
        key: "id",
      },
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
      validate: {
        isIn: [
          [
            "active",
            "banned",
            "left",
            "rejected-invite",
            "rejected-request",
            "invited",
            "requested",
          ],
        ],
      },
    },
    joined_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    left_at: {
      type: DataTypes.DATE,
    },
    banned_at: {
      type: DataTypes.DATE,
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
    privileges: {
      type: DataTypes.STRING,
      defaultValue: "11",
    },
  },
  { tableName: "community_users", timestamps: false }
);
