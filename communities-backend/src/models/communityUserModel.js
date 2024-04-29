import { DataTypes } from "sequelize";

import db from "../../config/database.js";

export const CommunityUser = db.define(
  "CommunityUser",
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    communityId: {
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
    joinedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    leftAt: {
      type: DataTypes.DATE,
    },
    bannedAt: {
      type: DataTypes.DATE,
    },
    bannedReason: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    bannedBy: {
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
