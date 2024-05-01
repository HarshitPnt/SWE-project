import { DataTypes } from "sequelize";

import db from "../../config/database.js";

export const Votes = db.define(
  "votes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    creator_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    parent_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: ["^(p|c|v)_"],
          msg: "parent_id must begin with p_ for posts, c_ for comments, or v_ for votes",
        },
      },
    },
    vote_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "votes",
  }
);
