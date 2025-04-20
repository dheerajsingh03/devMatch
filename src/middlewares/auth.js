const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  // List of public routes that do not require authentication
  const publicRoutes = [
    "/privacy-policy",
    "/terms-and-conditions",
    "/refund-policy",
    "/shipping-policy",
    "/contact-us",
    "/login",  // Allow login page without authentication
    "/signup"  // Allow signup page without authentication
  ];

  // If the request path is public, skip the authentication
  if (publicRoutes.includes(req.path)) {
    return next();
  }

  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!");
    }

    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = { userAuth };
