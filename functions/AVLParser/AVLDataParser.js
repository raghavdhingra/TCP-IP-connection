const hex_to_dec = require("../hexToDec");
const gpsParser = require("./gpsParser");
const IOParser = require("./IOParser");

const AVLDataParser = (data, data_1_number) => {
  let AVL_Array = [];
  let obj = {};
  let initial_length = 10;
  let gps_element = "";
  let io_element = "";

  for (var i = 1; i <= data_1_number; i++) {
    obj = {};
    obj["timestamp"] = hex_to_dec(data, initial_length, initial_length + 8);
    initial_length += 8;

    obj["priority"] = hex_to_dec(data, initial_length, initial_length + 1);
    initial_length++;

    gps_element = gpsParser(data, initial_length);
    obj["gps_element"] = gpsParser(data, initial_length);

    io_element = IOParser(data, initial_length);
    obj["io_element"] = IOParser(data, initial_length);

    AVL_Array.push(obj);
  }
  return AVL_Array;
};

module.exports = AVLDataParser;
