const converter = require("hex2dec");

const dataPacketParser = (data) => {
  let obj = {};
  let Zeroes = converter.hexToDec(Buffer.from(data).toString("hex", 0, 4));
  console.log(Zeroes);
  obj = {
    data: data,
  };
  return obj;
};

module.exports = dataPacketParser;
