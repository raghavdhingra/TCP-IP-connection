const converter = require("hex2dec");
const AVLDataParser = require("./AVLDataParser");

const dataPacketParser = (data) => {
  let obj = {};
  let total_data_length = data.length;
  console.log(`Total Length: ${total_data_length}`);
  let four_zeroes = converter.hexToDec(Buffer.from(data).toString("hex", 0, 4));
  let data_field_length = converter.hexToDec(
    Buffer.from(data).toString("hex", 4, 8)
  );
  let codec_id = converter.hexToDec(Buffer.from(data).toString("hex", 8, 9));
  let data_1_number = converter.hexToDec(
    Buffer.from(data).toString("hex", 9, 10)
  );

  let avl_data = AVLDataParser(data);

  let data_2_number = converter.hexToDec(
    Buffer.from(data).toString(
      "hex",
      total_data_length - 5,
      total_data_length - 4
    )
  );
  let crc_16 = converter.hexToDec(
    Buffer.from(data).toString("hex", total_data_length - 4, total_data_length)
  );
  obj = {
    four_zeroes: four_zeroes,
    data_field_length: data_field_length,
    codec_id: codec_id,
    data_1_number: data_1_number,
    avl_data: avl_data,
    data_2_number: data_2_number,
    crc_16: crc_16,
    response: new Uint8Array([
      0,
      0,
      0,
      Buffer.from(data).toString("hex", 9, 10),
    ]),
  };
  return obj;
};

module.exports = dataPacketParser;
