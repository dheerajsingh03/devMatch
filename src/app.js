const express = require("express");
const connectDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

require("dotenv").config();
require("./utils/cronjob");

// Import your routes
const publicRouter = require("./routes/public");  // This is the file for public routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const paymentRouter =require("./routes/payment");

app.use(
  cors({
    origin: "http://localhost:5173",  // Allow requests from your frontend (adjust if needed)
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Use public router first, so these routes are not blocked by authentication
app.use("/", publicRouter);

// Use the other protected routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/",paymentRouter);

// Connect to database and start the server
connectDb()
  .then(() => {
    console.log("Successfully connected to DB");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.log("Error in database connection:", err);
  });
