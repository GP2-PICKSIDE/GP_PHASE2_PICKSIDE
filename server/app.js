const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const router = require("./routers");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} is connected`);
});

// router
app.use(router);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
