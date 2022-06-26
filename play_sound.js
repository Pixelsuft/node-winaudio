const {
  dll
} = require('./loader');
const encoder = require('./encoding_tools');


exports.PlaySoundW = function(sound, hmod, flags, end = '\x00') {
  return dll.PlaySoundW(encoder.str_to_utf16(sound + end), hmod, flags);
}

exports.PlaySoundA = function(sound, hmod, flags, end = '\x00') {
  return dll.PlaySoundA(encoder.str_to_utf8(sound + end), hmod, flags);
}
