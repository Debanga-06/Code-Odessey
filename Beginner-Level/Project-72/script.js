const artwork = document.getElementById('artwork');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const progressTrack = document.getElementById('progressTrack');
const progressFill = document.getElementById('progressFill');
const progressHandle = document.getElementById('progressHandle');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const volumeRange = document.getElementById('volumeRange');
const playlistEl = document.getElementById('playlist');

const PLAYLIST = [
  { title: 'Midnight Drive', artist: 'Neon Pulse', duration: 180, icon: '🎵' },
  { title: 'City Lights', artist: 'Arcade Echo', duration: 210, icon: '🎸' },
  { title: 'Electric Skyline', artist: 'Voltage', duration: 165, icon: '🎹' },
  { title: 'Neon Rain', artist: 'Synthwave Kid', duration: 195, icon: '🎤' },
  { title: 'Afterglow', artist: 'Neon Pulse', duration: 220, icon: '🎧' }
];

let currentTrackIndex = 0;
let isPlaying = false;
let currentSeconds = 0;
let isShuffleOn = false;
let isRepeatOn = false;
let playbackIntervalId = null;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function loadTrack(index) {
  const track = PLAYLIST[index];

  trackTitle.textContent = track.title;
  trackArtist.textContent = track.artist;
  artwork.textContent = track.icon;
  totalTimeEl.textContent = formatTime(track.duration);
  currentSeconds = 0;
  updateProgressDisplay();
  renderPlaylist();
}

function updateProgressDisplay() {
  const track = PLAYLIST[currentTrackIndex];
  const percentage = (currentSeconds / track.duration) * 100;

  progressFill.style.width = `${percentage}%`;
  progressHandle.style.left = `${percentage}%`;
  currentTimeEl.textContent = formatTime(currentSeconds);
}

function togglePlay() {
  isPlaying = !isPlaying;
  playBtn.textContent = isPlaying ? '⏸' : '▶';

  if (isPlaying) {
    startPlaybackTimer();
  } else {
    stopPlaybackTimer();
  }
}

function startPlaybackTimer() {
  playbackIntervalId = setInterval(() => {
    const track = PLAYLIST[currentTrackIndex];
    currentSeconds++;

    if (currentSeconds >= track.duration) {
      handleTrackEnd();
      return;
    }

    updateProgressDisplay();
  }, 1000);
}

function stopPlaybackTimer() {
  clearInterval(playbackIntervalId);
}

function handleTrackEnd() {
  if (isRepeatOn) {
    currentSeconds = 0;
    updateProgressDisplay();
  } else {
    playNext();
  }
}

function playNext() {
  if (isShuffleOn) {
    currentTrackIndex = Math.floor(Math.random() * PLAYLIST.length);
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % PLAYLIST.length;
  }
  loadTrack(currentTrackIndex);
}

function playPrevious() {
  currentTrackIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
  loadTrack(currentTrackIndex);
}

function toggleShuffle() {
  isShuffleOn = !isShuffleOn;
  shuffleBtn.classList.toggle('active', isShuffleOn);
}

function toggleRepeat() {
  isRepeatOn = !isRepeatOn;
  repeatBtn.classList.toggle('active', isRepeatOn);
}

function seekTo(event) {
  const rect = progressTrack.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const percentage = Math.min(Math.max(clickX / rect.width, 0), 1);

  const track = PLAYLIST[currentTrackIndex];
  currentSeconds = Math.floor(percentage * track.duration);
  updateProgressDisplay();
}

function selectTrack(index) {
  currentTrackIndex = index;
  loadTrack(currentTrackIndex);

  if (isPlaying) {
    stopPlaybackTimer();
    startPlaybackTimer();
  }
}

function renderPlaylist() {
  playlistEl.innerHTML = '';

  PLAYLIST.forEach((track, index) => {
    const item = document.createElement('div');
    item.classList.add('playlist-item');
    if (index === currentTrackIndex) item.classList.add('playing');

    item.innerHTML = `
      <div class="playlist-item-name">
        <span>${track.title}</span>
        <span class="playlist-item-artist">${track.artist}</span>
      </div>
      <span class="playlist-item-duration">${formatTime(track.duration)}</span>
    `;

    item.addEventListener('click', () => selectTrack(index));
    playlistEl.appendChild(item);
  });
}

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrevious);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);
progressTrack.addEventListener('click', seekTo);

volumeRange.addEventListener('input', () => {
  const volume = volumeRange.value;
  document.querySelector('.volume-icon').textContent = volume == 0 ? '🔇' : volume < 50 ? '🔉' : '🔊';
});

loadTrack(currentTrackIndex);