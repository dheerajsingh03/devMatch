const express = require("express");

const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const { validateEditProfile } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, (req, res) => {
  try {
    if (!validateEditProfile(req)) throw new Error("Invalid Edit Request");
  } catch (err) {
    res.send(err);
  }
});

module.exports = profileRouter;
