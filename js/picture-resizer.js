const Scale = {
  STEP: 0.25,
  MIN: 0.25,
  MAX: 1,
  DEFAULT: 1,
};


import { picturePreview } from './util.js';

const pictureDecreaser = document.querySelector('.scale__control--smaller');
const pictureIncreaser = document.querySelector('.scale__control--bigger');
const pictureScale = document.querySelector('.scale__control--value');

let scale = Scale.DEFAULT;

// Обновление отображения масштаба
const updateScale = () => {
  picturePreview.style.transform = `scale(${scale})`;
  pictureScale.value = `${scale * 100}%`;
};

// Увеличение размера изображения
const increasePicture = () => {
  if (scale < Scale.MAX) {
    scale += Scale.STEP;
    updateScale();
  }
};

// Уменьшение масштаба изображения
const decreasePicture = () => {
  if (scale > Scale.MIN) {
    scale -= Scale.STEP;
    updateScale();
  }
};

// Сброс масштаба до начального значения
const resetScale = () => {
  scale = Scale.DEFAULT;
  updateScale();
};

// Обработчики событий для изменения изображения
pictureIncreaser.addEventListener('click', () => {
  increasePicture();
});

pictureDecreaser.addEventListener('click', () => {
  decreasePicture();
});

export { resetScale };
