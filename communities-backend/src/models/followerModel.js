import { DataTypes } from "sequelize";

import db from "../../config/database.js";

const Follows = db.define(
  "Follows",
  {
    follower_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    followed_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
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
  },
  {
    timestamps: false,
    tableName: "follows",
    hooks: {
      beforeCreate: (follows) => {
        if (follows.follower_id === follows.followed_id) {
          throw new Error("follower_id and followed_id cannot be the same");
        }
      },
    },
  }
);

export default Follows;
