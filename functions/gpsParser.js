const converter = require("hex2dec");

const gpsParser = (data) => {
  let obj = {};
  obj["longitude"] = converter.hexToDec(
    Buffer.from(data).toString("hex", 19, 23)
  );
  obj["latitude"] = converter.hexToDec(
    Buffer.from(data).toString("hex", 23, 27)
  );
  obj["altitude"] = converter.hexToDec(
    Buffer.from(data).toString("hex", 27, 29)
  );
  obj["angle"] = converter.hexToDec(Buffer.from(data).toString("hex", 29, 31));
  obj["satellites"] = converter.hexToDec(
    Buffer.from(data).toString("hex", 31, 32)
  );
  obj["speed"] = converter.hexToDec(Buffer.from(data).toString("hex", 32, 34));
  return obj;
};

module.exports = gpsParser;
