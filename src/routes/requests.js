const express = require("express");

const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const User = require("../models/user");

requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;

  res.send(user.firstName + "sent a request");
});

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    const fromUserId = req.user?._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    if (fromUserId.toString() === toUserId)
      return res.send("You cannot send request to yourself");

    if (status != "interested" && status != "ignore")
      return res.send("invalid status");

    const toUser = await User.findById(toUserId);
    if (!toUser) return res.send("User does not exists");
 
    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingRequest) return res.send("Request Already Exists!!");
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: "Request Sent",
    });
  }
);

module.exports = requestRouter;
