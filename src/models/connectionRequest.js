const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
    },

    status: {
      type: String,
      enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

connectionRequestSchema.index({
  fromUserId: 1,
  toUserId: 1,
});

const ConnectionRequestModel = new mongoose.model(
  "Connection request",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
