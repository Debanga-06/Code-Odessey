const playlists = [
  { name:"Liked Songs", sub:"Playlist • 248 songs", emoji:"💚", bg:"linear-gradient(135deg,#450af5,#8e8ee5)" },
  { name:"Coding Vibes", sub:"Playlist • You", emoji:"💻", bg:"linear-gradient(135deg,#1db954,#006d2c)" },
  { name:"Lo-Fi Beats", sub:"Playlist • Spotify", emoji:"🎧", bg:"linear-gradient(135deg,#ff6437,#c9210b)" },
  { name:"Morning Boost", sub:"Playlist • You", emoji:"☀️", bg:"linear-gradient(135deg,#f59b23,#e13300)" },
  { name:"Late Night", sub:"Playlist • Spotify", emoji:"🌙", bg:"linear-gradient(135deg,#1e3264,#0d0d0d)" },
  { name:"Hindi Hits", sub:"Playlist • Spotify", emoji:"🎶", bg:"linear-gradient(135deg,#e91429,#7d0a14)" },
];
const quickPicksData = [
  { title:"Today's Top Hits", sub:"Bad Bunny is on top", emoji:"🔥", bg:"linear-gradient(135deg,#1db954,#006d2c)" },
  { title:"RapCaviar", sub:"Music that defines the moment", emoji:"🎤", bg:"linear-gradient(135deg,#e91429,#7d0a14)" },
  { title:"All Out 2010s", sub:"The biggest songs of the decade", emoji:"⚡", bg:"linear-gradient(135deg,#f59b23,#e13300)" },
  { title:"Peaceful Piano", sub:"Relax and indulge", emoji:"🎹", bg:"linear-gradient(135deg,#1e3264,#503590)" },
  { title:"Mega Hit Mix", sub:"Played more than a billion times", emoji:"💥", bg:"linear-gradient(135deg,#8d67ab,#503590)" },
  { title:"Viva Latino", sub:"Hits en español", emoji:"💃", bg:"linear-gradient(135deg,#e91429,#ff6437)" },
];
const artistsData = [
  { title:"Bad Bunny", sub:"Artist", emoji:"🐰", bg:"linear-gradient(135deg,#4b917d,#0d0d0d)", round:true },
  { title:"Taylor Swift", sub:"Artist", emoji:"🌟", bg:"linear-gradient(135deg,#b49bc8,#503590)", round:true },
  { title:"Drake", sub:"Artist", emoji:"🦉", bg:"linear-gradient(135deg,#606060,#0d0d0d)", round:true },
  { title:"The Weeknd", sub:"Artist", emoji:"🌙", bg:"linear-gradient(135deg,#e13300,#0d0d0d)", round:true },
  { title:"Dua Lipa", sub:"Artist", emoji:"💜", bg:"linear-gradient(135deg,#503590,#1e3264)", round:true },
  { title:"SZA", sub:"Artist", emoji:"🌺", bg:"linear-gradient(135deg,#8d67ab,#503590)", round:true },
];
const chartsData = [
  { title:"Top 50 — Global", sub:"Your daily update of the most played tracks", emoji:"🌍", bg:"linear-gradient(135deg,#1db954,#1e3264)" },
  { title:"Top 50 — India", sub:"Your daily update of the most played tracks", emoji:"🇮🇳", bg:"linear-gradient(135deg,#e91429,#f59b23)" },
  { title:"Viral 50 — Global", sub:"Your daily update of the most viral tracks", emoji:"📈", bg:"linear-gradient(135deg,#ff6437,#c9210b)" },
  { title:"New Music Friday", sub:"The best new music, every Friday", emoji:"🆕", bg:"linear-gradient(135deg,#1e3264,#503590)" },
  { title:"Hot Hits India", sub:"The hottest tracks right now", emoji:"🔥", bg:"linear-gradient(135deg,#e13300,#8d67ab)" },
  { title:"Bollywood Butter", sub:"Fresh Bollywood hits", emoji:"🎬", bg:"linear-gradient(135deg,#f59b23,#e91429)" },
];
const madeForYouData = [
  { title:"Daily Mix 1", sub:"Bad Bunny, Drake, Post Malone and more", emoji:"🎯", bg:"linear-gradient(135deg,#1db954,#006d2c)" },
  { title:"Daily Mix 2", sub:"Taylor Swift, Olivia Rodrigo and more", emoji:"💿", bg:"linear-gradient(135deg,#8d67ab,#503590)" },
  { title:"Daily Mix 3", sub:"The Weeknd, SZA, Frank Ocean and more", emoji:"🎶", bg:"linear-gradient(135deg,#e13300,#0d0d0d)" },
  { title:"Discover Weekly", sub:"Your weekly mixtape of fresh music", emoji:"🔍", bg:"linear-gradient(135deg,#1e3264,#0d0d0d)" },
  { title:"Release Radar", sub:"Catch all the latest music from artists you follow", emoji:"📡", bg:"linear-gradient(135deg,#606060,#1e3264)" },
  { title:"Liked Songs Radio", sub:"Based on your liked songs", emoji:"💚", bg:"linear-gradient(135deg,#450af5,#8e8ee5)" },
];
const tracks = [
  { title:"Today's Top Hits", artist:"Various Artists", emoji:"🔥", bg:"linear-gradient(135deg,#1db954,#006d2c)" },
  { title:"Blinding Lights", artist:"The Weeknd", emoji:"🌙", bg:"linear-gradient(135deg,#e13300,#0d0d0d)" },
  { title:"Anti-Hero", artist:"Taylor Swift", emoji:"🌟", bg:"linear-gradient(135deg,#b49bc8,#503590)" },
  { title:"Flowers", artist:"Miley Cyrus", emoji:"🌸", bg:"linear-gradient(135deg,#f59b23,#e91429)" },
  { title:"As It Was", artist:"Harry Styles", emoji:"💫", bg:"linear-gradient(135deg,#e91429,#503590)" },
];

let currentTrack = 0, isPlaying = false, isShuffle = true, isRepeat = false, isMuted = false;
let progress = 30, progressTimer = null;

function PSVG() { return '<svg viewBox="0 0 24 24" style="width:18px;height:18px;fill:#000;margin-left:2px"><path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"/></svg>'; }

function buildCards(id, data, isRound) {
  document.getElementById(id).innerHTML = data.map(d => `
    <div class="card" onclick="playCard('${d.title.replace(/'/g,"\\'")}','${(d.sub||d.artist||'').replace(/'/g,"\\'")}','${d.emoji}','${d.bg}')">
      <div class="card-art${isRound?' round':''}" style="background:${d.bg}">
        <span style="font-size:${isRound?'52':'42'}px">${d.emoji}</span>
        <button class="play-fab" onclick="event.stopPropagation();playCard('${d.title.replace(/'/g,"\\'")}','${(d.sub||d.artist||'').replace(/'/g,"\\'")}','${d.emoji}','${d.bg}')">${PSVG()}</button>
      </div>
      <div class="card-title">${d.title}</div>
      <div class="card-sub">${d.sub||d.artist||''}</div>
    </div>`).join('');
}

function buildPlaylists() {
  document.getElementById('playlists').innerHTML = playlists.map(p =>
    `<div class="playlist-item"><div class="playlist-thumb" style="background:${p.bg}">${p.emoji}</div><div class="playlist-info"><p>${p.name}</p><span>${p.sub}</span></div></div>`
  ).join('');
}

function setGreeting() {
  const h = new Date().getHours();
  document.getElementById('greeting').textContent = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

function togglePlay() {
  isPlaying = !isPlaying;
  document.getElementById('playIcon').innerHTML = isPlaying
    ? '<path d="M5.7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1zm12.6 0a1 1 0 0 0-1 1v16a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1z"/>'
    : '<path d="M7.05 3.606l13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"/>';
  isPlaying ? startProgress() : clearInterval(progressTimer);
}

function startProgress() {
  clearInterval(progressTimer);
  progressTimer = setInterval(() => {
    progress = Math.min(progress + 0.2, 100);
    document.getElementById('progressFill').style.width = progress + '%';
    const cur = Math.floor(progress / 100 * 198);
    document.getElementById('currentTime').textContent = `${Math.floor(cur/60)}:${String(cur%60).padStart(2,'0')}`;
    if (progress >= 100) { progress = 0; currentTrack = (currentTrack+1)%tracks.length; loadTrack(); }
  }, 200);
}

function scrub(e, el) {
  const r = el.getBoundingClientRect();
  progress = ((e.clientX - r.left) / r.width) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
}

function setVolume(e, el) {
  const r = el.getBoundingClientRect();
  document.getElementById('volFill').style.width = Math.max(0, Math.min(100, ((e.clientX-r.left)/r.width)*100)) + '%';
}

function toggleMute() { isMuted=!isMuted; document.getElementById('volFill').style.width = isMuted?'0%':'70%'; }
function toggleHeart(el) { el.classList.toggle('liked'); }
function toggleShuffle() { isShuffle=!isShuffle; document.getElementById('shuffleBtn').classList.toggle('active',isShuffle); }
function toggleRepeat() { isRepeat=!isRepeat; document.getElementById('repeatBtn').classList.toggle('active',isRepeat); }
function nextTrack() { currentTrack=(currentTrack+1)%tracks.length; loadTrack(); }
function prevTrack() { currentTrack=(currentTrack-1+tracks.length)%tracks.length; loadTrack(); }

function loadTrack() {
  const t = tracks[currentTrack];
  document.getElementById('npTitle').textContent = t.title;
  document.getElementById('npArtist').textContent = t.artist;
  document.getElementById('npArt').style.background = t.bg;
  document.getElementById('npArt').textContent = t.emoji;
  progress = 0;
  document.getElementById('progressFill').style.width = '0%';
  document.getElementById('currentTime').textContent = '0:00';
  if (isPlaying) startProgress();
}

function playCard(title, sub, emoji, bg) {
  document.getElementById('npTitle').textContent = title;
  document.getElementById('npArtist').textContent = sub;
  document.getElementById('npArt').style.background = bg;
  document.getElementById('npArt').textContent = emoji;
  progress = 0;
  if (!isPlaying) togglePlay(); else startProgress();
}

function setCat(el) { document.querySelectorAll('.cat-pill').forEach(b=>b.classList.remove('active')); el.classList.add('active'); }

document.getElementById('main').addEventListener('scroll', function() {
  document.getElementById('topbar').classList.toggle('scrolled', this.scrollTop > 60);
});

buildPlaylists();
buildCards('quickPicks', quickPicksData);
buildCards('artists', artistsData, true);
buildCards('charts', chartsData);
buildCards('madeForYou', madeForYouData);
setGreeting();
