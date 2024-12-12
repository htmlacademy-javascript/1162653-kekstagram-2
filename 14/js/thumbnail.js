const thumbnailList = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Функция очистки миниатюр
const clearThumbnails = () => {
  thumbnailList.querySelectorAll('.picture').forEach((element) => element.remove());
};

// Функция возвращает одну миниатюру
const createThumbnail = ({ id, url, description, likes, comments }) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  const userPicture = thumbnailElement.querySelector('.picture__img');

  thumbnailElement.dataset.pictureId = id;
  userPicture.src = url;
  userPicture.alt = description;
  thumbnailElement.querySelector('.picture__likes').textContent = likes;
  thumbnailElement.querySelector('.picture__comments').textContent = comments.length;
  return thumbnailElement;
};

// Функция для создания всех миниатюр
const renderThumbnails = (thumbnails) => {
  clearThumbnails();
  const thumbnailFragment = document.createDocumentFragment();

  thumbnails.forEach((thumbnail) => {
    const thumbnailElement = createThumbnail(thumbnail);
    thumbnailFragment.appendChild(thumbnailElement);
  });

  thumbnailList.appendChild(thumbnailFragment);
};

export { renderThumbnails };
