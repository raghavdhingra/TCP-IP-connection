const hex_to_dec = require("../hexToDec");

const gpsParser = (data, initial_length) => {
  let initial_num = initial_length; //initial_num=19
  let obj = {};
  obj["longitude"] = hex_to_dec(data, initial_length, initial_length + 4);
  initial_num += 4;

  obj["latitude"] = hex_to_dec(data, initial_length, initial_length + 4);
  initial_num += 4;

  obj["altitude"] = hex_to_dec(data, initial_length, initial_length + 2);
  initial_num += 2;

  obj["angle"] = hex_to_dec(data, initial_length, initial_length + 2);
  initial_num += 2;

  obj["satellites"] = hex_to_dec(data, initial_length, initial_length + 1);
  initial_num++;

  obj["speed"] = hex_to_dec(data, initial_length, initial_length + 2);
  initial_num += 2; //initial_num = 34

  return obj;
};

module.exports = gpsParser;
