import { isEscapeKey } from './util.js';
import { validateForm, resetValidateForm } from './form-validation.js';

const uploadPictureForm = document.querySelector('.img-upload__form');
const hashtagsField = uploadPictureForm.querySelector('.text__hashtags');
const commentField = uploadPictureForm.querySelector('.text__description');
const uploadPictureButton = document.querySelector('.img-upload__input');
const pictureEditor = document.querySelector('.img-upload__overlay');
const closeEditorButton = document.querySelector('.img-upload__cancel');
const pictureScale = document.querySelector('.scale__control--value');
const picturePreview = document.querySelector('.img-upload__preview img');

// Открытие и закрытие формы загрузки изображения
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (isEscapeKey(evt) && document.activeElement !== hashtagsField && document.activeElement !== commentField) {
      evt.preventDefault();
      closePictureEditor();
    }

  }
};

// Функция для открытия формы редоактирования
const openPictureEditor = () => {
  pictureEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  pictureScale.value = '100%';
  picturePreview.style.transform = '1';
};

// Функция для закрытия формы редоактирования
function closePictureEditor() {
  pictureEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPictureForm.reset();
  resetValidateForm();
  document.removeEventListener('keydown', onDocumentKeydown);
}

uploadPictureButton.addEventListener('change', () => {
  openPictureEditor();
});

closeEditorButton.addEventListener('click', () => {
  closePictureEditor();
});

// Реализуем отправку формы при успешной валидации
uploadPictureForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (validateForm) {
    hashtagsField.value = hashtagsField.value.trim().replaceAll(/\s+/g, ' ');
    uploadPictureForm.submit();
  }
});


