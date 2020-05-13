const converter = require("hex2dec");

const hex_to_dec = (data, initial_pt, final_pt) => {
  let num = parseInt(
    converter.hexToDec(Buffer.from(data).toString("hex", initial_pt, final_pt))
  );
  return num;
};

module.exports = hex_to_dec;
