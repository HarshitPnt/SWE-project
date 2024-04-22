import { DataTypes } from "sequelize";

import db from "../../config/database.js";

const Authentication = db.define(
  "Authentication",
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

export default Authentication;
