const encoder = new TextEncoder();
const decoder = new TextDecoder();

exports.str_to_utf16 = function(str) {
  var arr = new Uint16Array(str.length);
  for (var i = 0; i < str.length; i++) {
    arr[i] = str.charCodeAt(i);
  }
  return arr;
}

exports.utf16_to_str = function(arr) {
  return String.fromCharCode(...arr);
}

exports.str_to_utf8 = function(str) {
  return encoder.encode(str);
}

exports.utf8_to_str = function(arr) {
  return decoder.decode(arr);
}

exports.str_trim = function(str) {
  return str.replaceAll('\x00', '');
}
