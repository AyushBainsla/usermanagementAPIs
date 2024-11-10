const app = require("../../app");  // Import your Express app

// Export a handler for Vercel to use
module.exports = (req, res) => {
  app(req, res);  // Pass the request and response to your Express app
};
