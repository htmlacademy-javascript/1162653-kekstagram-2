const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SHOWN_PICTURE_COUNT = 0;

import { picturePreview } from './util.js';

const pictureChooser = document.querySelector('.img-upload__input');
const effectsPreview = document.querySelectorAll('.effects__preview');

const showUserPicture = () => {
  pictureChooser.addEventListener('change', () => {
    const file = pictureChooser.files[SHOWN_PICTURE_COUNT];
    const pictureName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => pictureName.endsWith(it));

    if (matches) {
      const imageURL = URL.createObjectURL(file);

      picturePreview.src = imageURL;
      effectsPreview.forEach((effect) => {
        effect.style.backgroundImage = `url("${imageURL}")`;
      });
    }
  });
};

export { showUserPicture };
