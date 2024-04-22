import { DataTypes } from "sequelize";

import db from "../../config/database.js";

const Blocked = db.define(
  "blocked",
  {
    blocker_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    blocked_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      primaryKey: true,
    },
    blocked_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
);

export default Blocked;
