const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://dheerajsingh:ZXCV1234@firstnode.d5xwx.mongodb.net/devTinder"
  );
};

module.exports = connectDb;
