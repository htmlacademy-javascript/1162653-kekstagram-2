import { isEscapeKey } from './util.js';

const uploadPictureForm = document.querySelector('.img-upload__form');
const hashtagsField = uploadPictureForm.querySelector('.text__hashtags');
const commentField = uploadPictureForm.querySelector('.text__description');
const uploadPictureButton = document.querySelector('.img-upload__input');
const pictureEditor = document.querySelector('.img-upload__overlay');
const closeEditorButton = document.querySelector('.img-upload__cancel');

// Открытие и закрытие формы загрузки изображения
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement === hashtagsField || document.activeElement === commentField) {
      evt.stopPropagation();
    } else {
      uploadPictureForm.reset();
      closePictureEditor();
    }

  }
};

// Функция для открытия формы редоактирования
function openPictureEditor() {
  pictureEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

// Функция для закрытия формы редоактирования
function closePictureEditor() {
  pictureEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPictureButton.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
}

uploadPictureButton.addEventListener('change', () => {
  openPictureEditor();
});

closeEditorButton.addEventListener('click', () => {
  closePictureEditor();
});


