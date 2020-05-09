const net = require("net");

const PORT = process.env.PORT || 9000;

const server = net.createServer();
server.on("connection", (socket) => {
  const remoteAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log("A new connection is made at: %s", remoteAddress);

  socket.on("data", (data) => {
    console.log(data);
    socket.write(`data sent: ${data}`);
  });
  socket.once("close", () => {
    console.log(`The connection from %s has been closed`, remoteAddress);
  });
  socket.on("error", (err) =>
    console.log(`Connection %s Error: %s`, remoteAddress, err.message)
  );
});

server.listen(PORT, () =>
  console.log("Server started at %j", server.address())
);
