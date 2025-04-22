const express = require("express");
const path = require("path");

const router = express.Router(); // Create a new router for public routes

// Define routes for public pages (no userAuth required)
router.get("/privacy-policy", (req, res) => {
  // Return the privacy-policy page
  res.sendFile(path.join(__dirname, "client/build", "privacy-policy.html"));
});

router.get("/terms-and-conditions", (req, res) => {
  // Return the terms-and-conditions page
  res.sendFile(path.join(__dirname, "client/build", "terms-and-conditions.html"));
});

router.get("/refund-policy", (req, res) => {
  // Return the refund-policy page
  res.sendFile(path.join(__dirname, "client/build", "refund-policy.html"));
});

router.get("/shipping-policy", (req, res) => {
  // Return the shipping-policy page
  res.sendFile(path.join(__dirname, "client/build", "shipping-policy.html"));
});

router.get("/contact-us", (req, res) => {
  // Return the contact-us page
  res.sendFile(path.join(__dirname, "client/build", "contact-us.html"));
});

// Export the router with the public routes
module.exports = router;
