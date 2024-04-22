import { DataTypes } from "sequelize";

import db from "../../config/database.js";

const Reports = db.define(
  "Reports",
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
    reporterId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    reportedId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    contentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    resolvedAt: {
      type: DataTypes.DATE,
    },
    resolvedBy: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    resolvedReason: {
      type: DataTypes.TEXT,
    },
    communityId: {
      type: DataTypes.INTEGER,
      references: {
        model: "communities",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "reports",
  }
);

export default Reports;
