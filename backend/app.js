import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import userRoute from "./router/user.js";
import postRoute from "./router/post.js";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// bodyParser
app.use(bodyParser.json({limit: '50mb'}));

// CORS
app.use(cors());

// Route
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

// Connect db
connectDb(DATABASE_URL);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
