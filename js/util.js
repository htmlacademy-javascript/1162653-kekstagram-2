const picturesContainer = document.querySelector('.pictures');
const uploadPictureForm = document.querySelector('.img-upload__form');
const picturePreview = document.querySelector('.img-upload__preview img');

// Функция для выбора кнопок
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция устранения дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export { isEscapeKey, debounce, picturesContainer, uploadPictureForm, picturePreview };
