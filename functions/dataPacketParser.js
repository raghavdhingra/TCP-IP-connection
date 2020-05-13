const hex_to_dec = require("./hexToDec");
const AVLDataParser = require("./AVLParser/AVLDataParser");

const dataPacketParser = (data) => {
  let obj = {};

  let total_data_length = data.length;
  console.log(`Total Length: ${total_data_length}`);

  let four_zeroes = hex_to_dec(data, 0, 4);
  let data_field_length = hex_to_dec(data, 4, 8);
  let codec_id = hex_to_dec(data, 8, 9);
  let data_1_number = hex_to_dec(data, 9, 10);

  let avl_data = AVLDataParser(data, data_1_number);

  let data_2_number = hex_to_dec(
    data,
    total_data_length - 5,
    total_data_length - 4
  );

  let crc_16 = hex_to_dec(data, total_data_length - 4, total_data_length);

  obj = {
    preamble: four_zeroes,
    avl_data_length: data_field_length,
    data: {
      codec_id: codec_id,
      data_1_number: data_1_number,
      avl_data: avl_data,
      data_2_number: data_2_number,
    },
    crc: crc_16,
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
