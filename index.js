const net = require("net");
var converter = require('hex2dec');

const server = net.createServer();
const PORT = process.env.PORT || 9000;

server.on("connection", (socket) => {

  const remoteAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log("A new connection is made at: %s", remoteAddress);

  socket.on("data", (data) => {
    console.log("Data: " + Buffer.from(data).toString('hex'));
    console.log("data.length: " + data.length);

    //console.log("Data: " + data)
    //console.log("Data Length: " + data.length);
    //console.log("Hex Buffer: " + Buffer.from(data, 'hex'));
    //console.log("Hex Buffer ToString: " + Buffer.from(data).toString('hex'));
    //console.log("Hex Buffer ToString utf8: " + Buffer.from(data, 'hex').toString('utf8'));

    var imeiGivenLength;

    if (data.length < 20) {
      //imeiGivenLength = getAnInt(msg);
      //imeiGivenLength = data.readUIntBE(0, 2);
      imeiGivenLength = converter.hexToDec(Buffer.from(data).toString("hex", 0, 2));
      console.log("imeiGivenLength: " + imeiGivenLength);

      var imei = Buffer.from(data, 'hex');

      //imei = readImei(msg);
      imei = Buffer.from(data).toString("utf8", 2, data.length);
      console.log("imei: " + imei);

      if (imei != null && imeiGivenLength == imei.length) {

        //bytes = new byte[] { 0x01 };
        let bytes = new Uint8Array([0x01]);
        socket.write(bytes);
        console.log(`Data send: ` + bytes);
      }
    } else if (data.length > 20) {

      console.log("4 Zero: " + converter.hexToDec(Buffer.from(data).toString("hex", 0, 4)));
      console.log("Data Length: " + converter.hexToDec(Buffer.from(data).toString("hex", 4, 8)));
      console.log("Codec ID: " + converter.hexToDec(Buffer.from(data).toString("hex", 8, 9)));
      console.log("No of Records: " + converter.hexToDec(Buffer.from(data).toString("hex", 9, 10)));

      //String receivedDataString = BytesArrayToHex(msg, msg.length);
      //PrintReceivedDataAndResponse(receivedDataString);

      //bytes = new byte[] { 0, 0, 0, msg[9] };
      let bytes = new Uint8Array([0,0,0,Buffer.from(data).toString("hex", 9, 10)]);
      socket.write(bytes);
      console.log(`Data send: ` + bytes);
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
