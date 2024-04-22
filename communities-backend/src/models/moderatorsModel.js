import { DataTypes } from "sequelize";

import db from "../../config/database.js";

const Moderators = db.define(
  "Moderators",
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
    privileges: {
      type: DataTypes.STRING(8),
      defaultValue: "11111111",
    },
  },
  {
    timestamps: false,
    tableName: "moderators",
  }
);

export default Moderators;
