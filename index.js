const {
  dll
} = require('./loader');
const flags = require('./flags');
const {
  PlaySoundA,
  PlaySoundW
} = require('./play_sound');
const {
  MCIW,
  MCIA
} = require('./mci');
const {
  Player
} = require('./player');


exports.dll = dll;
exports.flags = flags;
exports.PlaySound = exports.PlaySoundW = PlaySoundW;
exports.PlaySoundA = PlaySoundA;
exports.MCI = exports.MCIW = MCIW;
exports.MCIA = MCIA;
exports.Player = Player;
