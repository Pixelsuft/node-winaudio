const {
  dll
} = require('./loader');
const encoder = require('./encoding_tools');
const ref = require('ref-napi');


exports.MCIW = class MCIW {
  constructor(buffer_size = 256, end = '\x00') {
    // this.buffer_size = buffer_size * 2;
    this.buffer_size = buffer_size;
    this.last_buffer_pos = buffer_size - 1;
    this.end = end;
  }

  send_result(command) {
    const buffer = Buffer.alloc(this.buffer_size);
    buffer.type = ref.types.uint16;
    const result = dll.mciSendStringW(
      encoder.str_to_utf16(command + this.end),
      buffer,
      this.last_buffer_pos,
      null
    );
    return [
      result,
      result ? this.get_error(result) : encoder.str_trim(encoder.utf16_to_str(buffer))
    ];
  }

  get_error(error_code) {
    const buffer = Buffer.alloc(this.buffer_size);
    buffer.type = ref.types.uint16;
    const result = dll.mciGetErrorStringW(
      error_code,
      buffer,
      this.last_buffer_pos
    )
    return [
      result,
      encoder.str_trim(encoder.utf16_to_str(buffer))
    ];
  }

  send(command) {
    const result = this.send_result(command);
    if (result[0]) {
      throw result[1][1];
    }
    return result[1];
  }
};

exports.MCIA = class MCIA {
  constructor(buffer_size = 256, end = '\x00') {
    this.buffer_size = buffer_size;
    this.last_buffer_pos = buffer_size - 1;
    this.end = end;
  }

  send_result(command) {
    const buffer = Buffer.alloc(this.buffer_size);
    buffer.type = ref.types.char;
    const result = dll.mciSendStringA(
      encoder.str_to_utf8(command + this.end),
      buffer,
      this.last_buffer_pos,
      null
    );
    return [
      result,
      result ? this.get_error(result) : encoder.str_trim(encoder.utf8_to_str(buffer))
    ];
  }

  get_error(error_code) {
    const buffer = Buffer.alloc(this.buffer_size);
    buffer.type = ref.types.uint16;
    const result = dll.mciGetErrorStringA(
      error_code,
      buffer,
      this.last_buffer_pos
    )
    return [
      result,
      encoder.str_trim(encoder.utf8_to_str(buffer))
    ];
  }

  send(command) {
    const result = this.send_result(command);
    if (result[0]) {
      throw result[1][1];
    }
    return result[1];
  }
};
