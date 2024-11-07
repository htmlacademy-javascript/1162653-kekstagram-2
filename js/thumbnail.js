const thumbnailListElement = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Функция возвращает одну миниатюру
const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);

  // Присваиваем id миниатюре
  thumbnailElement.dataset.pictureId = id;
  thumbnailElement.querySelector('.picture__img').src = url;
  thumbnailElement.querySelector('.picture__img').alt = description;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  return thumbnailElement;
};

// Функция для создания всех миниатюр
const renderThumbnails = (thumbnails) => {
  const thumbnailFragment = document.createDocumentFragment();

  thumbnails.forEach((thumbnail) => {
    const thumbnailElement = createThumbnail(thumbnail);
    thumbnailFragment.appendChild(thumbnailElement);
  });

  thumbnailListElement.appendChild(thumbnailFragment);
};

export { renderThumbnails };
