const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,

      minLength: 2,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Not valid");
      },
    },
    password: {
      type: String,
      validate(value) {
        if (!validator.isStrongPassword(value)) throw new Error("Not valid");
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
    },
    skills: {
      type: [String],
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ firstName: 1, lastName: 1 });

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id }, "devTinder@123", {
    expiresIn: "1h",
  });

  return token;
};

module.exports = mongoose.model("User", userSchema);
