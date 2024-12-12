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

requestRouter.post(
  "/request/review/:status/:requestId",

  userAuth,

  async (req, res) => {
    try {
      const allowedStatus = ["accepted", "rejected"];

      const { status, requestId } = req.params;

      const isValidStatus = allowedStatus.includes(status);

      if (!isValidStatus) return res.send("Invalid Status");

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: req.user._id,
        status: "interested",
      });

      if (!connectionRequest) return res.send("Request not found");

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({
        message: "Connection request " + status,
        data,
      });
    } catch (err) {
      res.send(err.message);
    }
  }
);

module.exports = requestRouter;
