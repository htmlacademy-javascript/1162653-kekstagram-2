import { isEscapeKey } from './util.js';
import { clearComments, renderComments } from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCaption = bigPicture.querySelector('.social__caption');

// Функция для отрисовки полноэкранного изображения
const renderBigPicture = ({ description, comments, likes, url }) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCaption.textContent = description;

  // Рендерим комментарии
  renderComments(comments);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Функция для открытия полноэкранного изображения
const openBigPicture = (image) => {
  renderBigPicture(image);

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция для закрытия полноэкранного изображения
function closeBigPicture() {
  clearComments();
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});

export { openBigPicture };


