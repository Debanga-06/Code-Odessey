const feed = document.getElementById('feed');

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #a78bfa, #7c5cff)',
  'linear-gradient(135deg, #ff8fc3, #ff5c8a)',
  'linear-gradient(135deg, #6fd8ff, #3a8fd0)',
  'linear-gradient(135deg, #ffcf6b, #ff9d4d)',
  'linear-gradient(135deg, #7ee8b0, #34c98f)'
];

const POSTS_DATA = [
  {
    username: 'Maya Chen',
    handle: '@mayacodes',
    time: '2h',
    verified: true,
    text: 'Finally shipped the redesign after three weeks of late nights. Small wins matter — proud of how this turned out 🚀',
    media: '🖥️',
    mediaColor: 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(255,143,195,0.2))',
    likes: 284,
    comments: [
      { author: 'Sam Rivera', text: 'This looks incredible, congrats!' },
      { author: 'Devon Lee', text: 'The attention to detail is unreal 👏' }
    ],
    shares: 12
  },
  {
    username: 'Devon Lee',
    handle: '@devonbuilds',
    time: '5h',
    verified: false,
    text: 'Hot take: the best debugging tool is still just explaining your code out loud to a rubber duck.',
    media: null,
    likes: 96,
    comments: [
      { author: 'Maya Chen', text: 'Rubber duck debugging never fails 🦆' }
    ],
    shares: 4
  },
  {
    username: 'Priya Nair',
    handle: '@priyanair',
    time: '1d',
    verified: true,
    text: 'Sunset from the office rooftop today. Sometimes you just need to step away from the screen for five minutes.',
    media: '🌇',
    mediaColor: 'linear-gradient(135deg, rgba(255,157,77,0.3), rgba(255,92,138,0.25))',
    likes: 512,
    comments: [
      { author: 'Sam Rivera', text: 'Stunning view!' },
      { author: 'Devon Lee', text: 'Where is this?' },
      { author: 'Maya Chen', text: 'Need this energy today 🌅' }
    ],
    shares: 28
  }
];

function getInitials(name) {
  return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
}

function getAvatarGradient(seed) {
  return AVATAR_GRADIENTS[seed % AVATAR_GRADIENTS.length];
}

function formatCount(count) {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}

function renderPosts() {
  POSTS_DATA.forEach((post, index) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post-card');
    if (post.verified) postEl.classList.add('verified');
    postEl.dataset.index = index;

    postEl.innerHTML = `
      <div class="post-header">
        <div class="avatar" style="background:${getAvatarGradient(index)}">${getInitials(post.username)}</div>
        <div class="post-user-info">
          <div class="post-user-row">
            <span class="post-username">${post.username}</span>
            <span class="verified-badge">✓</span>
          </div>
          <span class="post-handle-time">${post.handle} · ${post.time}</span>
        </div>
        <button class="more-btn" aria-label="More options">⋯</button>
      </div>

      <p class="post-text">${post.text}</p>

      <div class="post-media ${post.media ? '' : 'hidden'}" style="background:${post.mediaColor || 'transparent'}">
        ${post.media || ''}
      </div>

      <div class="stats-row">
        <span class="likes-count">${formatCount(post.likes)} likes</span>
        <span class="comments-count">${post.comments.length} comments · ${post.shares} shares</span>
      </div>

      <div class="action-row">
        <button class="action-btn like-btn">
          <span class="action-icon"></span> Like
        </button>
        <button class="action-btn comment-toggle-btn">
          <span class="action-icon">💬</span> Comment
        </button>
        <button class="action-btn share-btn">
          <span class="action-icon">↗</span> Share
        </button>
        <button class="action-btn save-btn">
          <span class="action-icon"></span> Save
        </button>
      </div>

      <div class="comments-section hidden">
        <div class="comments-list"></div>
        <div class="comment-input-row">
          <input type="text" class="comment-input" placeholder="Write a comment...">
          <button class="comment-send-btn">➤</button>
        </div>
      </div>
    `;

    feed.appendChild(postEl);
    wirePostInteractions(postEl, post, index);
    renderComments(postEl, post, index);
  });
}

function wirePostInteractions(postEl, post, index) {
  const likeBtn = postEl.querySelector('.like-btn');
  const saveBtn = postEl.querySelector('.save-btn');
  const shareBtn = postEl.querySelector('.share-btn');
  const commentToggleBtn = postEl.querySelector('.comment-toggle-btn');
  const commentsSection = postEl.querySelector('.comments-section');
  const commentInput = postEl.querySelector('.comment-input');
  const commentSendBtn = postEl.querySelector('.comment-send-btn');
  const likesCountEl = postEl.querySelector('.likes-count');

  let isLiked = false;

  likeBtn.addEventListener('click', () => {
    isLiked = !isLiked;
    likeBtn.classList.toggle('liked', isLiked);
    post.likes += isLiked ? 1 : -1;
    likesCountEl.textContent = `${formatCount(post.likes)} likes`;
  });

  saveBtn.addEventListener('click', () => {
    saveBtn.classList.toggle('saved');
  });

  shareBtn.addEventListener('click', () => {
    post.shares++;
    updateStatsLine(postEl, post);
    shareBtn.style.color = '#6fd8ff';
    setTimeout(() => { shareBtn.style.color = ''; }, 600);
  });

  commentToggleBtn.addEventListener('click', () => {
    commentsSection.classList.toggle('hidden');
  });

  commentSendBtn.addEventListener('click', () => submitComment());
  commentInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') submitComment();
  });

  function submitComment() {
    const text = commentInput.value.trim();
    if (text.length === 0) return;

    post.comments.push({ author: 'You', text });
    commentInput.value = '';
    renderComments(postEl, post, index);
    updateStatsLine(postEl, post);
    commentsSection.classList.remove('hidden');
  }
}

function renderComments(postEl, post) {
  const commentsList = postEl.querySelector('.comments-list');
  commentsList.innerHTML = '';

  post.comments.forEach((comment, i) => {
    const commentEl = document.createElement('div');
    commentEl.classList.add('comment');

    commentEl.innerHTML = `
      <div class="comment-avatar" style="background:${getAvatarGradient(i + 3)}">${getInitials(comment.author)}</div>
      <div class="comment-body">
        <div class="comment-author">${comment.author}</div>
        <div class="comment-text">${comment.text}</div>
      </div>
    `;

    commentsList.appendChild(commentEl);
  });
}

function updateStatsLine(postEl, post) {
  const commentsCountEl = postEl.querySelector('.comments-count');
  commentsCountEl.textContent = `${post.comments.length} comments · ${post.shares} shares`;
}

renderPosts();