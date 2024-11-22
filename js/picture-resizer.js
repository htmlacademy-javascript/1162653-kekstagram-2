const picturePreview = document.querySelector('.img-upload__preview img');
const pictureDecreaser = document.querySelector('.scale__control--smaller');
const pictureIncreaser = document.querySelector('.scale__control--bigger');
const pictureScale = document.querySelector('.scale__control--value');

const SCALE_STEP = 0.25;
const MIN_SCALE = 0.25;
const MAX_SCALE = 1;
const DEFAULT_SCALE = 1;

let scale = DEFAULT_SCALE;

// Обновление отображения масштаба
const updateScale = () => {
  picturePreview.style.transform = `scale(${scale})`;
  pictureScale.value = `${scale * 100}%`;
};

// Увеличение размера изображения
const increasePicture = () => {
  if (scale < MAX_SCALE) {
    scale += SCALE_STEP;
    updateScale();
  }
};

// Уменьшение масштаба изображения
const decreasePicture = () => {
  if (scale > MIN_SCALE) {
    scale -= SCALE_STEP;
    updateScale();
  }
};

// Сброс масштаба до начального значения
const resetScale = () => {
  scale = DEFAULT_SCALE;
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
