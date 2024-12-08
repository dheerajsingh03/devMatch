const express = require("express");

const connectDb = require("./config/database");

const User = require("./models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const cookie = require("cookie-parser");

const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(cookie());

app.use(express.json());

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) throw new Error("Invalid Creditential");

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, "devTinder@123",{
        expiresIn : '0d',
      });

      res.cookie("token", token);

      res.send("Login Successfull");
    } else throw new Error("Invalid Creditential");
  } catch (err) {
    res.send(err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.send(err.message);
  }
});

app.post("/signup", async (req, res) => {
  const { password, firstName, lastName, emailId } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });

  try {
    await user.save();
    res.send("Data Saved");
  } catch (err) {
    res.send(err.message);
  }
});

connectDb()
  .then(() => {
    console.log("Succesfully");
    app.listen(7777, () => {
      console.log("Connection at 7777");
    });
  })
  .catch((err) => {
    console.log("erorr");
  });
