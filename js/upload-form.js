import { isEscapeKey } from './util.js';
import { validateForm, resetValidateForm } from './form-validation.js';
import { resetScale } from './picture-resizer.js';
import { resetEffects, initializeEffects } from './picture-effects.js';

const uploadPictureForm = document.querySelector('.img-upload__form');
const hashtagsField = uploadPictureForm.querySelector('.text__hashtags');
const commentField = uploadPictureForm.querySelector('.text__description');
const uploadPictureButton = document.querySelector('.img-upload__input');
const pictureEditor = document.querySelector('.img-upload__overlay');
const closeEditorButton = document.querySelector('.img-upload__cancel');

// Открытие и закрытие формы загрузки изображения
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== hashtagsField && document.activeElement !== commentField) {
    evt.preventDefault();
    closePictureEditor();
  }
};

// Функция для открытия формы редоактирования
const openPictureEditor = () => {
  pictureEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initializeEffects();
  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция для закрытия формы редоактирования
function closePictureEditor() {
  pictureEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPictureForm.reset();
  resetValidateForm();
  resetScale();
  resetEffects();
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


