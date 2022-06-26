const ffi = require('ffi-napi');


exports.dll = ffi.Library('winmm.dll', {
  'PlaySoundW': ['long', ['Uint16*', 'void*', 'Ulong']],
  'PlaySoundA': ['long', ['char*', 'void*', 'Ulong']],
  'mciSendStringW': ['Ulong', ['Uint16*', 'Uint16**', 'Ulong', 'void*']],
  'mciSendStringA': ['Ulong', ['char*', 'char**', 'Ulong', 'void*']],
  'mciGetErrorStringW': ['long', ['Ulong', 'Uint16**', 'Ulong']],
  'mciGetErrorStringA': ['long', ['Ulong', 'char**', 'Ulong']],
});
