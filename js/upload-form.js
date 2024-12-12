import { isEscapeKey } from './util.js';
import { validateForm, resetValidateForm } from './form-validation.js';
import { resetScale } from './picture-resizer.js';
import { resetEffects, initializeEffects } from './picture-effects.js';
import { sendData } from './api.js';
import { showModal } from './user-messages.js';

const uploadPictureForm = document.querySelector('.img-upload__form');
const hashtagsField = uploadPictureForm.querySelector('.text__hashtags');
const commentField = uploadPictureForm.querySelector('.text__description');
const uploadPictureButton = document.querySelector('.img-upload__input');
const pictureEditor = document.querySelector('.img-upload__overlay');
const closeEditorButton = document.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');

// Добавляем интерактивность кнопок
const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Открытие и закрытие формы загрузки изображения
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && document.activeElement !== hashtagsField && document.activeElement !== commentField && !document.querySelector('.error')) {
    evt.preventDefault();
    closePictureEditor();
  }
};

// Функция для открытия формы редактирования
const openPictureEditor = () => {
  pictureEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  initializeEffects();
  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция для закрытия формы редактирования
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
const setUploadFormSubmit = (onSuccessAction) => {
  uploadPictureForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccessAction();
          showModal('success');
        })
        .catch(() => {
          showModal('error');
        })
        .finally(unblockSubmitButton);
    }
  });
};

export { setUploadFormSubmit, closePictureEditor, onDocumentKeydown };

