import { picturesContainer } from './util.js';

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Функция очистки миниатюр
const clearThumbnails = () => {
  picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());
};

// Функция возвращает одну миниатюру
const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const userPicture = thumbnail.querySelector('.picture__img');

  thumbnail.dataset.pictureId = id;
  userPicture.src = url;
  userPicture.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  return thumbnail;
};

// Функция для создания всех миниатюр
const renderThumbnails = (pictures) => {
  clearThumbnails();
  const thumbnailFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    thumbnailFragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(thumbnailFragment);
};

export { renderThumbnails };
