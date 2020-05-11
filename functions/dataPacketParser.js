const converter = require("hex2dec");

const dataPacketParser = (data) => {
  let obj = {};
  let four_zeroes = converter.hexToDec(Buffer.from(data).toString("hex", 0, 4));
  let data_field_length = converter.hexToDec(
    Buffer.from(data).toString("hex", 4, 8)
  );
  let codec_id = converter.hexToDec(Buffer.from(data).toString("hex", 8, 9));
  let data_1_number = converter.hexToDec(
    Buffer.from(data).toString("hex", 9, 10)
  );
  obj = {
    four_zeroes: four_zeroes,
    data_field_length: data_field_length,
    codec_id: codec_id,
    data_1_number: data_1_number,
  };
  return obj;
};

module.exports = dataPacketParser;
