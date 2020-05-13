const net = require("net");
const IMEI_parser = require("./functions/IMEIParser/IMEI_parser");
const dataPacketParser = require("./functions/dataPacketParser");

const server = net.createServer();
const PORT = process.env.PORT || 9000;

server.on("connection", (socket) => {
  const remoteAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log("A new connection is made at: %s", remoteAddress);

  socket.on("data", (data) => {
    // let hex_data = Buffer.from(data).toString("hex");
    // console.log(`Hex Data: ${hex_data}`);

    if (data.length < 20) {
      let response = IMEI_parser(data);
      socket.write(response);
    } else {
      let data_packet = dataPacketParser(data);
      socket.write(data_packet.response);
      console.log(data_packet);

      console.log(data_packet.data.avl_data);
      console.log(`Data Sent: ${data_packet.response}`);
    }
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
