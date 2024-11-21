const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Db");
  } catch (error) {
    console.error("Database Connection Error!", error);
  }
};

module.exports = connectDb;
