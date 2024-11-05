import { isEscapeKey } from './util.js';
import { generatePhotos } from './data.js';
import { renderThumbnails } from './thumbnail.js';

const photosDescriptions = generatePhotos();
renderThumbnails(photosDescriptions);

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');
const likesCountElement = bigPicture.querySelector('.likes-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsTemplate = document.querySelector('.social__comment');
const commentsCaption = bigPicture.querySelector('.social__caption');
const commentShownCountElement = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPicture.querySelector('.social__comment-total-count');
const commentCountElement = bigPicture.querySelector('.social__comment-count');
const commentLoaderElement = bigPicture.querySelector('.comments-loader');

// Функция для отрисовки полноэкранного изображения
const renderBigPicture = (image) => {

  bigPictureImg.src = image.url;
  likesCountElement.textContent = image.likes;
  commentsCaption.textContent = image.description;
  commentTotalCountElement.textContent = image.comments.length;

  commentsContainer.innerHTML = ''; // Очищаем контейнер комментариев
  const commentsFragment = document.createDocumentFragment();

  image.comments.forEach((comment) => {
    const commentElement = commentsTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(commentElement);
  });
  commentsContainer.appendChild(commentsFragment);

  commentShownCountElement.textContent = image.comments.length;
  commentCountElement.classList.add('hidden');
  commentLoaderElement.classList.add('hidden');
};

// Функция для обработки нажатия клавиш
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Функция для открытия полноэкранного окна
function openBigPicture(pictureId) {
  const selectedPhoto = photosDescriptions.find((photo) => photo.id === Number(pictureId));

  renderBigPicture(selectedPhoto);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

// Обработчик клика по миниатюре
picturesContainer.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    openBigPicture(currentPicture.querySelector('.picture__img').dataset.pictureId);
  }
});

bigPictureCloseButton.addEventListener('click', closeBigPicture);

