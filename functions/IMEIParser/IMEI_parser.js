const hex_to_dec = require("../hexToDec");

const true_byte = new Uint8Array([0x01]);
const false_byte = new Uint8Array([0x00]);

const IMEI_parser = (data) => {
  let IMEI = Buffer.from(data).toString("utf8", 2, data.length);
  let IMEI_length_Given = hex_to_dec(data, 0, 2);

  if (IMEI !== null && IMEI.length === IMEI_length_Given) {
    console.log(`IMEI length: ${IMEI_length_Given}`);
    console.log(`Data sent: ${true_byte}`);
    return true_byte;
  } else {
    console.log(`Error while reading IMEI number. Please try again.`);
    console.log(`Data sent: ${false_byte}`);
    return false_byte;
  }
};

module.exports = IMEI_parser;
