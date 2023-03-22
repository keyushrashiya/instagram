import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import chatRoute from "./router/chat.js";
import userRoute from "./router/user.js";
import postRoute from "./router/post.js";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import chatModel from "./model/chatModel.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", async (data) => {
    socket.join(data);
    console.log(`User: ${socket.id} , Room: ${data}`);
  });

  socket.on("send_message", async (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log("data", data);
    const doc = new chatModel({
      user: { userId: data.user.userId },
      room: data.room,
      message: data.message,
      time: data.time,
    });
    await doc.save();
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// bodyParser
app.use(bodyParser.json({ limit: "50mb" }));

// CORS
app.use(cors());

// Route
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/chat", chatRoute);

// Connect db
connectDb(DATABASE_URL);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
