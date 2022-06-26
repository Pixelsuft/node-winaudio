const wa = require('./index');


if (true) {
  console.log('Testing PlaySoundW for wave file...');
  console.log(wa.PlaySound('D:/Music/HateBit - Track3.wav', null, wa.flags.SND_SYNC));
  console.log('Completed!');
}

if (true) {
  console.log('Testing PlaySoundA for wave file...');
  console.log(wa.PlaySoundA('D:/Music/HateBit - MenuTrack.wav', null, wa.flags.SND_SYNC));
  console.log('Completed!');
}

if (true) {
  console.log('Testing MCIW...');
  const mci = new wa.MCI(1024);
  console.log(mci);
  console.log(mci.send('open "d:/music/Joel Nielsen - Ascension (v2).mp3" alias xd'));
  console.log(mci.send('play xd wait'));
  console.log(mci.send('close xd'));
  console.log('Completed!');
}

if (true) {
  console.log('Testing MCIA...');
  const mci = new wa.MCIA(1024);
  console.log(mci);
  console.log(mci.send('open "d:/music/Lchavasse - Lunar Abyss.mp3" alias xd2'));
  console.log(mci.send('play xd2 wait'));
  console.log(mci.send('close xd2'));
  console.log('Completed!');
}

if (true) {
  console.log('Testing Player...');
  const p = new wa.Player('D:/Music/Morch Kovalski - Forget About Freeman.mp3');
  console.log(p);
  console.log(p.toString());
  console.log('Length: ' + Math.floor(p.length_s / 60) + 'm' + Math.floor(p.length_s % 60) + 's');
  console.log(p.play());
  // p.speed = 2;
  // p.volume = 0.1;
  p.destroy(); // p.wait_on_close === true
  console.log('Completed!');
}
