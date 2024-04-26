import { DataTypes } from "sequelize";

import db from "../../config/database.js";

export const Authentication = db.define(
  "authentication",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "authentication",
  }
);

Authentication.associate = (models) => {
  Authentication.belongsTo(models.Users, {
    foreignKey: {
      name: "username",
      allowNull: false,
    },
  });
  Authentication.belongsTo(models.Users, {
    foreignKey: {
      name: "email",
      allowNull: false,
    },
  });
};
