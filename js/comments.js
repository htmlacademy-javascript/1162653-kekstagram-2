const COUNT_STEP = 5;
let currentCount = 0;
let commentsArray = [];

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsTemplate = document.querySelector('.social__comment');
//const commentCountElement = bigPicture.querySelector('.social__comment-count');
const commentLoaderElement = bigPicture.querySelector('.comments-loader');
const shownCommentsCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentsCount = bigPicture.querySelector('.social__comment-total-count');
commentsContainer.innerHTML = '';

// Функция для постепенного рендеринга комментариев
const renderNextComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const renderedComments = commentsArray.slice(currentCount, currentCount + COUNT_STEP);
  const renderedCommentsLength = renderedComments.length + currentCount;

  renderedComments.forEach((comment) => {
    const commentElement = commentsTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(commentsFragment);
  shownCommentsCount.textContent = renderedCommentsLength;
  totalCommentsCount.textContent = commentsArray.length;

  if (renderedCommentsLength >= commentsArray.length) {
    commentLoaderElement.classList.add('hidden');
  }
  currentCount += COUNT_STEP;
};

// Очистка комментариев
const clearComments = () => {
  currentCount = 0;
  commentsContainer.innerHTML = '';
  commentLoaderElement.classList.remove('hidden');
  commentLoaderElement.removeEventListener('click', renderNextComments);
};

// Функция для рендеринга комментариев
const renderComments = (currentComments) => {
  commentsArray = currentComments;
  renderNextComments();
  commentLoaderElement.addEventListener('click', renderNextComments);
};

export { clearComments, renderComments };
