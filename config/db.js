const mongoose = require("mongoose");

const connectDB = async () => {
  let conn;
  try {
    if (conn == null) {
      conn = await mongoose.connect(process.env.MONGO_URI);
    }
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
