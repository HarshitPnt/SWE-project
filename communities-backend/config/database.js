import { Sequelize } from "sequelize";

const db = new Sequelize("communities", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
  logging: console.log,
  port: 5433,
});

export default db;
