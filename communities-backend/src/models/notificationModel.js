import { DataTypes } from "sequelize";

import db from "../../config/database.js";

const Notification = db.define(
  "Notification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [
          [
            "follow",
            "comment",
            "vote",
            "mention",
            "report",
            "moderator",
            "community",
          ],
        ],
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    readAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isAfter: "createdAt",
      },
    },
    link: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "notifications",
  }
);

export default Notification;
