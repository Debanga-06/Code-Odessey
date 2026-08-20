const playerWrapper = document.getElementById('playerWrapper');
const video = document.getElementById('video');
const centerPlay = document.getElementById('centerPlay');
const playBtn = document.getElementById('playBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeRange = document.getElementById('volumeRange');
const timeText = document.getElementById('timeText');
const speedSelect = document.getElementById('speedSelect');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const seekTrack = document.getElementById('seekTrack');
const seekFill = document.getElementById('seekFill');
const seekHandle = document.getElementById('seekHandle');
const seekBuffered = document.getElementById('seekBuffered');
const controlsBar = document.getElementById('controlsBar');

let controlsHideTimeoutId = null;
let isDraggingSeek = false;

function formatTime(totalSeconds) {
  if (isNaN(totalSeconds)) return '0:00';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayIcon() {
  const icon = video.paused ? '▶' : '⏸';
  playBtn.textContent = icon;
  centerPlay.textContent = icon;
  centerPlay.classList.toggle('hidden', !video.paused);
}

function updateProgress() {
  if (isDraggingSeek) return;

  const percentage = (video.currentTime / video.duration) * 100 || 0;
  seekFill.style.width = `${percentage}%`;
  seekHandle.style.left = `${percentage}%`;
  timeText.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
}

function updateBuffered() {
  if (video.buffered.length === 0) return;

  const bufferedEnd = video.buffered.end(video.buffered.length - 1);
  const percentage = (bufferedEnd / video.duration) * 100 || 0;
  seekBuffered.style.width = `${percentage}%`;
}

function seekToPosition(clientX) {
  const rect = seekTrack.getBoundingClientRect();
  const clickX = clientX - rect.left;
  const percentage = Math.min(Math.max(clickX / rect.width, 0), 1);

  video.currentTime = percentage * video.duration;
  seekFill.style.width = `${percentage * 100}%`;
  seekHandle.style.left = `${percentage * 100}%`;
}

function toggleMute() {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted || video.volume === 0 ? '🔇' : '🔊';
  volumeRange.value = video.muted ? 0 : video.volume * 100;
}

function handleVolumeChange() {
  const volume = volumeRange.value / 100;
  video.volume = volume;
  video.muted = volume === 0;
  muteBtn.textContent = volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊';
}

function handleSpeedChange() {
  video.playbackRate = Number(speedSelect.value);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    playerWrapper.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function showControls() {
  controlsBar.style.opacity = '1';
  clearTimeout(controlsHideTimeoutId);

  if (!video.paused) {
    controlsHideTimeoutId = setTimeout(() => {
      controlsBar.style.opacity = '0';
    }, 2500);
  }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('progress', updateBuffered);
video.addEventListener('loadedmetadata', updateProgress);

playBtn.addEventListener('click', togglePlay);
muteBtn.addEventListener('click', toggleMute);
volumeRange.addEventListener('input', handleVolumeChange);
speedSelect.addEventListener('change', handleSpeedChange);
fullscreenBtn.addEventListener('click', toggleFullscreen);

seekTrack.addEventListener('mousedown', (event) => {
  isDraggingSeek = true;
  seekToPosition(event.clientX);
});

document.addEventListener('mousemove', (event) => {
  if (isDraggingSeek) {
    seekToPosition(event.clientX);
  }
});

document.addEventListener('mouseup', () => {
  isDraggingSeek = false;
});

playerWrapper.addEventListener('mousemove', showControls);
playerWrapper.addEventListener('mouseleave', () => {
  if (!video.paused) {
    controlsBar.style.opacity = '0';
  }
});

updatePlayIcon();