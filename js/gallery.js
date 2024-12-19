
import { picturesContainer } from './util.js';
import { renderThumbnails } from './thumbnail.js';
import { openBigPicture } from './big-picture.js';

const initGallery = (photos) => {
  renderThumbnails(photos);

  picturesContainer.addEventListener('click', (evt) => {
    const currentPicture = evt.target.closest('.picture');

    if (currentPicture) {
      const pictureId = Number(currentPicture.dataset.pictureId);
      const selectedPhoto = photos.find((photo) => photo.id === pictureId);
      if (selectedPhoto) {
        openBigPicture(selectedPhoto);
      }
    }
  });
};

export { initGallery };


