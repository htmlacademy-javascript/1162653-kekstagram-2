import { renderThumbnails } from './thumbnail.js';
import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');

const initGallery = (photos) => {
  // Отрисовываем миниатюры
  renderThumbnails(photos);

  // Вешаем обработчик на контейнер миниатюр
  picturesContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');

    if (currentPicture) {
      // Находим объект данных по ID миниатюры
      const pictureId = Number(currentPicture.dataset.pictureId);
      const selectedPhoto = photos.find((photo) => photo.id === pictureId);
      // Открываем большое изображение с найденным объектом
      openBigPicture(selectedPhoto);
    }
  });
};

export { initGallery };


