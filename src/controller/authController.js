const bcrypt = require("bcrypt");
const { User } = require("../model/userSchema"); // Correct import
const passport = require("../config/passport-config");

module.exports = {
  // Render User Login Page
  getUserLogin: async (req, res) => {
    try {
      const locals = { title: "User Login" };
      return res.json({ message: "User Login page", locals });
    } catch (error) {
      console.error("Error loading login page:", error);
      return res.status(500).json({ message: "Error loading login page", error });
    }
  },

  // Render User Registration Page
  getUserRegister: async (req, res) => {
    try {
      const locals = { title: "User Register" };
      return res.json({ message: "User Register page", locals });
    } catch (error) {
      console.error("Error loading registration page:", error);
      return res.status(500).json({ message: "Error loading registration page", error });
    }
  },

  // Register a New User with Static Password
  userRegister: async (req, res) => {
    const { full_name, email, phone_number, dob, additional_notes } = req.body;

    try {
      console.log("Checking if user exists with email:", email);
      const isExist = await User.findOne({ where: { email: email } });

      // Log the result for debugging
      console.log("User found:", isExist);

      if (isExist) {
        return res.status(400).json({ message: "User already exists. Please log in." });
      }

      const staticPassword = "Test@123";
      const hashpwd = await bcrypt.hash(staticPassword, 12);

      const user = await User.create({
        full_name,
        email,
        phone_number,
        dob,
        additional_notes,
        password: hashpwd,
      });

      if (user) {
        return res.status(201).json({ message: "User registered successfully. Please log in." });
      } else {
        return res.status(500).json({ message: "Registration failed." });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Error during registration", error });
    }
  },

  // User Login
  userLogin: (req, res, next) => {
    passport.authenticate("user-local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ message: "User logged in successfully", user });
      });
    })(req, res, next);
  },

  // User Logout
  logout: async (req, res) => {
    try {
      req.logout((err) => {
        if (err) console.log(err);
        res.clearCookie("connect.sid");
        return res.status(200).json({ message: "User logged out successfully" });
      });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ message: "Logout error", error });
    }
  },

  // Get User Profile
  getUserProfile: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id); // Using Sequelize's findByPk instead of findById
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ user });
    } catch (error) {
      console.error("Failed to retrieve user profile:", error);
      return res.status(500).json({ message: "Failed to retrieve user profile", error });
    }
  },

  // Get All Users
getAllUsers: async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.findAll();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Failed to retrieve users:", error);
    return res.status(500).json({ message: "Failed to retrieve users", error });
  }
},


  // Update User Profile
  updateUserProfile: async (req, res) => {
    try {
      const { full_name, email, phone_number, dob, additional_notes } = req.body;
      const [updatedRows, updatedUser] = await User.update(
        { full_name, email, phone_number, dob, additional_notes },
        { where: { id: req.user.id }, returning: true }
      );

      if (updatedRows === 0) {
        return res.status(404).json({ message: "User not found or no changes made." });
      }

      return res.status(200).json({ message: "User profile updated successfully", user: updatedUser[0] });
    } catch (error) {
      console.error("Failed to update profile:", error);
      return res.status(500).json({ message: "Failed to update profile", error });
    }
  },

  // Delete User Account
  deleteUserAccount: async (req, res) => {
    try {
      const deletedRows = await User.destroy({ where: { id: req.user.id } });
      if (deletedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
      console.error("Failed to delete account:", error);
      return res.status(500).json({ message: "Failed to delete account", error });
    }
  },
};
