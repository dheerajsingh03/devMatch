const express = require("express");

const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});



module.exports = profileRouter;
