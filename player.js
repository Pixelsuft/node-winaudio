const {
  MCIW,
  MCIA
} = require('./mci');


exports.Player = class Player {
  constructor(
    filename,
    alias = '',
    sync = false,
    repeat = false,
    auto_load = true,
    auto_create_mci = true,
    mci = MCIW,
    buffer_size = 256,
    end = '\x00'
  ) {
    this.fn = filename;
    this.alias = alias || filename;
    this.sync = sync;
    this.repeat = repeat;
    this.wait_on_close = true;
    this.length = 0;
    if (auto_create_mci)
      this.mci = new mci(buffer_size = buffer_size, end = end);
    if (auto_load)
      this.load();
  }

  get_var(var_name) {
    return this.mci.send('status "' + this.alias + '" ' + var_name);
  }

  set_var(var_name, var_content) {
    return this.mci.send('set "' + this.alias + '" ' + var_name + ' ' + var_content);
  }

  get length_s() {
    return this.length / 1000;
  }

  load() {
    this.mci.send('open "' + this.fn + '" alias "' + this.alias + '"');
    this.mci.send('set "' + this.alias + '" time format milliseconds');
    this.length = parseInt(this.get_var('length'), 10);
  }

  get mode() {
    return this.get_var('mode');
  }

  get speed() {
    return parseInt(this.get_var('speed'), 10) / 1000;
  }

  set speed(speed) {
    return this.set_var('speed', Math.floor(speed * 1000));
  }

  get volume() {
    return parseInt(this.get_var('volume'), 10) / 1000;
  }

  set volume(volume) {
    return this.mci.send('setaudio "' + this.alias + '" volume to ' + Math.floor(volume * 1000));
  }

  get position() {
    return parseInt(this.get_var('position'), 10);
  }

  set position(pos) {
    return this.mci.send('seek "' + this.alias + '" to ' + pos);
  }

  get paused() {
    return this.mode === 'paused';
  }

  get stopped() {
    return this.mode === 'stopped';
  }

  get playing() {
    return this.mode === 'playing';
  }

  pause() {
    return this.mci.send('pause "' + this.alias + '"')
  }

  resume() {
    return this.mci.send('pause "' + this.alias + '"')
  }

  wait_until_finish(loop_callback) {
    while (this.playing) {
      if (loop_callback) {
        loop_callback();
      }
    }
  }

  play(from_ms, to_ms) {
    var command = 'play "' + this.alias + '"';
    if (from_ms)
      command += ' from ' + from_ms;
    if (to_ms)
      command += ' to ' + to_ms;
    if (this.repeat)
      command += ' repeat';
    if (this.sync)
      command += ' wait';
    return this.mci.send(command);
  }

  force_play(from_ms, to_ms) {
    if (this.playing)
      return;
    if (this.paused)
      this.stop_no_seek();
    return this.play(from_ms, to_ms);
  }

  stop_no_seek() {
    return this.mci.send('stop "' + this.alias + '"');
  }

  stop() {
    this.position = 'start';
    return this.stop_no_seek();
  }

  close() {
    try {
      return this.mci.send('close "' + this.alias + '"');
    } catch (e) {
      return e;
    }
  }

  close_bool() {
    try {
      this.mci.send('close "' + this.alias + '"');
      return false;
    } catch (e) {
      return e;
    }
  }

  destroy(wait_callback, bool_return) {
    if (this.wait_on_close && this.playing)
      this.wait_until_finish(wait_callback);
    if (bool_return)
      return this.close_bool();
    return this.close();
  }

  toString() {
    return '<Player filename="' + this.fn + '" length="' + this.length + 'ms">';
  }
}
