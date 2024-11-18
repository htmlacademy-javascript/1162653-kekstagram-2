const picturePreview = document.querySelector('.img-upload__preview img');

const pictureDecreaser = document.querySelector('.scale__control--smaller');
const pictureIncreaser = document.querySelector('.scale__control--bigger');
const pictureScale = document.querySelector('.scale__control--value');

let scale = 1;
const SCALE_STEP = 0.25;
const MIN_SCALE = 0.25;
const MAX_SCALE = 1;

// Увеличение размера изображения
const increasePicture = () => {
  if (scale < MAX_SCALE) {
    scale += SCALE_STEP;
    scale = Math.min(scale, MAX_SCALE);
    picturePreview.style.transform = `scale(${scale})`;
    pictureScale.value = `${scale * 100}%`;
  }
};

// Уменьшение масштаба изображения
const decreasePicture = () => {
  if (scale > MIN_SCALE) {
    scale -= SCALE_STEP;
    scale = Math.max(scale, MIN_SCALE);
    picturePreview.style.transform = `scale(${scale})`;// Обновляем поле формы
  }
};
// Применение фильтра изображения

// Обработчики событий для изменения изображения

pictureIncreaser.addEventListener('click', () => {
  increasePicture();
});

pictureDecreaser.addEventListener('click', () => {
  decreasePicture();
});
