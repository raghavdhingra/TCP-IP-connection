const net = require("net");
const IMEI_parser = require("./functions/IMEI_parser");
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
      console.log(data_packet);
    }
    // } else if (data.length > 20) {
    //   console.log(
    //     "4 Zero: " + converter.hexToDec(Buffer.from(data).toString("hex", 0, 4))
    //   );
    //   console.log(
    //     "Data Length: " +
    //       converter.hexToDec(Buffer.from(data).toString("hex", 4, 8))
    //   );
    //   console.log(
    //     "Codec ID: " +
    //       converter.hexToDec(Buffer.from(data).toString("hex", 8, 9))
    //   );
    //   console.log(
    //     "No of Records: " +
    //       converter.hexToDec(Buffer.from(data).toString("hex", 9, 10))
    //   );
    //   let bytes = new Uint8Array([
    //     0,
    //     0,
    //     0,
    //     Buffer.from(data).toString("hex", 9, 10),
    //   ]);
    //   socket.write(bytes);
    //   console.log(`Data send: ` + bytes);
    // }
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
