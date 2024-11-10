require('dotenv').config();  // Load environment variables from .env file

const { Sequelize } = require("sequelize");

// Set up the connection to PostgreSQL
const sequelize = new Sequelize(
  process.env.PG_DATABASE, // Database name
  process.env.PG_USER,     // Username
  process.env.PG_PASSWORD, // Password
  {
    host: process.env.PG_HOST || "localhost",
    dialect: "postgres",
    port: process.env.PG_PORT || 5432,
    logging: console.log,  // Optional: logs SQL queries to console for debugging
  }
);

// Function to connect to the database
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    // Sync the models with the database (create tables if they don't exist)
    await sequelize.sync({ force: false }); // 'force: false' will not drop the table if it already exists
    console.log("Database synced.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connectDB, sequelize };
