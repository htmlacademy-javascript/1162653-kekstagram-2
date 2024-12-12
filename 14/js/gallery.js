import { renderThumbnails } from './thumbnail.js';
import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');

const initGallery = (photos) => {
  renderThumbnails(photos);

  picturesContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');

    if (currentPicture) {
      const pictureId = Number(currentPicture.dataset.pictureId);
      const selectedPhoto = photos.find((photo) => photo.id === pictureId);
      openBigPicture(selectedPhoto);
    }
  });
};

export { initGallery };


