const net = require("net");

const PORT = process.env.PORT || 9000;

const server = net.createServer();
server.on("connection", (socket) => {
  const remoteAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log("A new connection is made at: %s", remoteAddress);
  const bytes = new Uint8Array([0x01]);
  let data_iterator = 0;

  socket.on("data", (data) => {
    if (data_iterator === 0) {
      socket.write(bytes);
      data_iterator++;
      console.log(`Data send: ${data_iterator}`);
    }
    console.log(data);
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
