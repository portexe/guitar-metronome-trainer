let bpm = 40;
const notes = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

let metronomeInterval;
let metronomePlaying = false;

// Either 'letter' or 'click'
let currentSoundState = 'letter';

const updateBpmText = (_bpm) => {
  document.getElementById('bpm').innerHTML = _bpm;
}
const updateBpmSlider = (_bpm) => {
  document.getElementById('bpm-slider').value = `${_bpm}`;
}

const updateBpm = (_bpm) => {
  clearInterval(metronomeInterval);
  updateBpmText(_bpm);
  updateBpmSlider(_bpm);
  bpm = _bpm;
  if (metronomePlaying) {
    playMetronome();
  }
};

const playMetronome = () => {
  metronomePlaying = true;
  document.getElementById('start').style.display = 'none';
  document.getElementById('stop').style.display = 'block';

  metronomeInterval = setInterval(function() {
    if (currentSoundState === 'letter') {
      const randomNoteString = notes[[Math.floor(Math.random()*notes.length)]];
      const randomNoteSound = new Audio(`./sounds/${randomNoteString}.wav`);
      randomNoteSound.play();
      currentSoundState = 'click';
      document.getElementById('current-note').innerHTML = randomNoteString.toUpperCase();
    } else {
      const click = new Audio('./sounds/metronome-click.wav');
      click.play();
      currentSoundState = 'letter';
    }
    
  }, Math.round(60000 / bpm));
}

const stopMetronome = () => {
  metronomePlaying = false;
  document.getElementById('stop').style.display = 'none';
  document.getElementById('start').style.display = 'block';
  clearInterval(metronomeInterval);
};

// Initial document load
document.addEventListener('DOMContentLoaded', () => {
  updateBpmText(bpm);
  updateBpmSlider(bpm);

  document.getElementById('bpm-minus').addEventListener('click', () => updateBpm(bpm - 1));
  document.getElementById('bpm-plus').addEventListener('click', () => updateBpm(bpm + 1));

  document.getElementById('bpm-slider').addEventListener('input', (evt) => updateBpm(evt.target.valueAsNumber));

  document.getElementById('start').addEventListener('click', playMetronome);
  document.getElementById('stop').addEventListener('click', stopMetronome);
});
