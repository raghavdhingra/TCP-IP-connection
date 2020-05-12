const converter = require("hex2dec");
const gpsParser = require("./gpsParser");

const AVLDataParser = (data) => {
  let obj = {};
  obj["timestamp"] = converter.hexToDec(
    Buffer.from(data).toString("hex", 10, 18)
  );
  obj["priority"] = converter.hexToDec(
    Buffer.from(data).toString("hex", 18, 19)
  );
  obj["gps_element"] = gpsParser(data);
  obj["io_element"] = converter.hexToDec(
    Buffer.from(data).toString("hex", 34, data.length - 5)
  );
  return obj;
};

module.exports = AVLDataParser;
