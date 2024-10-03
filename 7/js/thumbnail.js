import { generatePhotos } from './data.js';

const thumbnailListElement = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = () => {
  const thumbnailList = generatePhotos();
  const thumbnailFragment = document.createDocumentFragment();

  thumbnailList.forEach(({ url, description, likes, comments }) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__img').src = url;
    thumbnailElement.querySelector('.picture__img').alt = description;
    thumbnailElement.querySelector('.picture__likes').textContent = likes;
    thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
    thumbnailFragment.appendChild(thumbnailElement);
  });

  thumbnailListElement.appendChild(thumbnailFragment);
};

export { createThumbnail };


