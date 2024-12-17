const COUNT_STEP = 5;
let currentCount = 0;
let comments = [];

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsTemplate = document.querySelector('.social__comment');
const commentLoader = bigPicture.querySelector('.comments-loader');
const shownCommentsCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentsCount = bigPicture.querySelector('.social__comment-total-count');

// Функция для постепенного рендеринга комментариев
const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const nextComments = comments.slice(currentCount, currentCount + COUNT_STEP);

  nextComments.forEach((comment) => {
    const commentElement = commentsTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(commentsFragment);
  currentCount += nextComments.length;
  shownCommentsCount.textContent = currentCount;

  if (currentCount >= comments.length) {
    commentLoader.classList.add('hidden');
  }
};

// Очистка комментариев
const clearComments = () => {
  currentCount = 0;
  commentsContainer.innerHTML = '';
  commentLoader.classList.remove('hidden');
};

const onCommentLoaderClick = () => {
  renderNextComments();
};

// Функция для рендеринга комментариев
const renderComments = (currentComments) => {
  comments = currentComments;
  totalCommentsCount.textContent = comments.length;
  clearComments();
  renderNextComments();
};

commentLoader.addEventListener('click', onCommentLoaderClick);


export { clearComments, renderComments };
