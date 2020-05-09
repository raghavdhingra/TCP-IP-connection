const net = require("net");

const PORT = process.env.PORT || 9000;

const server = net.createServer();
server.on(
  "connection",
  (socket) => {
    console.log("Server set up");
    socket.on("data", (data) => console.log(data));
  }
  // console.log(`${socket.remoteAddress}---${socket.remotePort}`);
);

server.on("error", (data) => console.log(data));

// server.off("connection", () => console.log("server disconnected"));

server.listen(PORT, () =>
  console.log("Server started at %j", server.address())
);
