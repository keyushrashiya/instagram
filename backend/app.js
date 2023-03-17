import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import userRoute from "./router/user.js";
import postRoute from "./router/post.js";
import bodyParser from "body-parser";
import cors from "cors";
// import WebSocket, { WebSocketServer } from "ws";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;
// const wss = new WebSocketServer({ port: 3002 });

// wss.on("connection", (ws) => {
//   console.log("connected webSocket");
//   ws.on("message", (message) => {
//     wss.clients.forEach((client) => {
//       if (wss.clients !== ws && client.readyState === WebSocket.OPEN) {
//         console.log(message instanceof Blob);
//         client.send(message);
//       }
//     });
//   });
// });

// wss.on("connection", (ws) => {
//   ws.on("message", (message) => {
//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });
// });

// bodyParser
app.use(bodyParser.json({ limit: "50mb" }));

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
