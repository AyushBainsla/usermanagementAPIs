const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Import sequelize from db.js

// Define the User model with specified fields
const User = sequelize.define("User", {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // Ensure full_name is not empty
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Email must be unique
    validate: {
      isEmail: true, // Ensures the value is a valid email
      notEmpty: true, // Ensure email is not empty
    },
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^[0-9]+$/i, // Only numbers allowed for phone_number
    },
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: true, // Ensure it's a valid date
    },
  },
  additional_notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true, // Automatically create 'createdAt' and 'updatedAt' columns
  indexes: [
    {
      unique: true,
      fields: ['email'], // This is to ensure email uniqueness is also indexed for faster lookups
    },
  ],
});

module.exports = { User }; // Correct export
