require('dotenv').config()
const { Sequelize } = require("sequelize");


// const PG_URI = `postgresql://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@localhost:5432/${process.env.PG_DATABASE}`;
const PG_URI = `postgresql://${process.env.PG_USERNAME}:${process.env.PG_PASSWORD}@${process.env.AWS_RDS_HOST}:${process.env.AWS_RDS_PORT}/${process.env.PG_DATABASE}`;

const sequelize = new Sequelize(PG_URI)

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDbConnection();


module.exports = { sq: sequelize, testDbConnection };