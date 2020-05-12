const converter = require("hex2dec");

const IOParser = (data) => {
  let obj = {};
  let event_io_id = parseInt(
    converter.hexToDec(Buffer.from(data).toString("hex", 34, 35))
  );
  let total_io_element = parseInt(
    converter.hexToDec(Buffer.from(data).toString("hex", 35, 36))
  );

  // IO ELEMENTS

  let secondary_obj = {};
  let io_key = "";
  let io_value = 0;
  let initial_length = 36;

  // One BYTE ELMENTS
  let elment_one_array = [];
  let total_one_bit = parseInt(
    converter.hexToDec(
      Buffer.from(data).toString("hex", initial_length, initial_length + 1)
    )
  );
  initial_length++;
  for (let i = 1; i <= total_one_bit; i++) {
    secondary_obj = {};
    io_key = converter.hexToDec(
      Buffer.from(data).toString("hex", initial_length, initial_length + 1)
    );
    initial_length++;
    io_value = parseInt(
      converter.hexToDec(
        Buffer.from(data).toString("hex", initial_length, initial_length + 1)
      )
    );
    initial_length++;
    secondary_obj["io_id"] = io_key;
    secondary_obj["io_value"] = io_value;
    elment_one_array.push(secondary_obj);
  }

  // TWO BYTES ELMENTS
  let elment_two_array = [];
  let total_two_bit = parseInt(
    converter.hexToDec(
      Buffer.from(data).toString("hex", initial_length, initial_length + 1)
    )
  );
  initial_length++;
  for (let i = 1; i <= total_two_bit; i++) {
    secondary_obj = {};
    io_key = converter.hexToDec(
      Buffer.from(data).toString("hex", initial_length, initial_length + 1)
    );
    initial_length++;
    io_value = parseInt(
      converter.hexToDec(
        Buffer.from(data).toString("hex", initial_length, initial_length + 2)
      )
    );
    initial_length += 2;
    secondary_obj["io_id"] = io_key;
    secondary_obj["io_value"] = io_value;
    elment_two_array.push(secondary_obj);
  }

  // FOUR BYTES ELMENTS
  let elment_four_array = [];
  let total_four_bit = parseInt(
    converter.hexToDec(
      Buffer.from(data).toString("hex", initial_length, initial_length + 1)
    )
  );
  initial_length++;
  for (let i = 1; i <= total_four_bit; i++) {
    secondary_obj = {};
    io_key = converter.hexToDec(
      Buffer.from(data).toString("hex", initial_length, initial_length + 1)
    );
    initial_length++;
    io_value = parseInt(
      converter.hexToDec(
        Buffer.from(data).toString("hex", initial_length, initial_length + 4)
      )
    );
    initial_length += 4;
    secondary_obj["io_id"] = io_key;
    secondary_obj["io_value"] = io_value;
    elment_four_array.push(secondary_obj);
  }

  // EIGHT BYTES ELMENTS
  let elment_eight_array = [];
  let total_eight_bit = parseInt(
    converter.hexToDec(
      Buffer.from(data).toString("hex", initial_length, initial_length + 1)
    )
  );
  initial_length++;
  for (let i = 1; i <= total_eight_bit; i++) {
    secondary_obj = {};
    io_key = converter.hexToDec(
      Buffer.from(data).toString("hex", initial_length, initial_length + 1)
    );
    initial_length++;
    io_value = parseInt(
      converter.hexToDec(
        Buffer.from(data).toString("hex", initial_length, initial_length + 8)
      )
    );
    initial_length += 8;
    secondary_obj["io_id"] = io_key;
    secondary_obj["io_value"] = io_value;
    elment_eight_array.push(secondary_obj);
  }

  //OBJECT TO BE RETURNED
  obj = {
    event_io_id: event_io_id,
    total_io_element: total_io_element,
    one_byte_element: {
      size_in_bytes: 1,
      total_number: total_one_bit,
      elements: elment_one_array,
    },
    two_bytes_element: {
      size_in_bytes: 2,
      total_number: total_two_bit,
      elements: elment_two_array,
    },
    four_bytes_element: {
      size_in_bytes: 4,
      total_number: total_four_bit,
      elements: elment_four_array,
    },
    eight_bytes_element: {
      size_in_bytes: 8,
      total_number: total_eight_bit,
      elements: elment_eight_array,
    },
  };
  return obj;
};

module.exports = IOParser;