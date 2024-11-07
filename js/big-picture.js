import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const likesCountElement = bigPicture.querySelector('.likes-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsTemplate = document.querySelector('.social__comment');
const commentsCaption = bigPicture.querySelector('.social__caption');
const commentShownCountElement = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPicture.querySelector('.social__comment-total-count');
const commentCountElement = bigPicture.querySelector('.social__comment-count');
const commentLoaderElement = bigPicture.querySelector('.comments-loader');

// Функция для рендеринга комментариев
const renderComments = (comments) => {
  commentsContainer.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = commentsTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(commentsFragment);
};

// Функция для отрисовки полноэкранного изображения
const renderBigPicture = ({ description, comments, likes, url }) => {
  bigPictureImg.src = url;
  likesCountElement.textContent = likes;
  commentsCaption.textContent = description;
  commentTotalCountElement.textContent = comments.length;

  // Рендерим комментарии
  renderComments(comments);

  commentShownCountElement.textContent = comments.length;
  commentCountElement.classList.add('hidden');
  commentLoaderElement.classList.add('hidden');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Функция для открытия полноэкранного изображения
function openBigPicture(image) {
  renderBigPicture(image);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
}

// Функция для закрытия полноэкранного изображения
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});

export { openBigPicture };


