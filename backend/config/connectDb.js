import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const options = {
  dbName: process.env.DB_NAME,
};

const connectDb = async (url) => {
  await mongoose.connect(url, options);
  console.log("Database connected successfully");
};
export default connectDb;
