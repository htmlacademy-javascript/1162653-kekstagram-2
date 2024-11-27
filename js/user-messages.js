import { isEscapeKey } from './util.js';
import { onDocumentKeydown } from './upload-form.js';

const ERROR_SHOW_TIME = 5000;

const body = document.body;
const loadErrorTemplate = document.querySelector('#data-error').content;
const sendErrorTemplate = document.querySelector('#error').content;
const sendSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

const onSuccessKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSendSuccess();
  }
};

const onErrorKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSendError();
  }
};

// Ошибка при загрузке контента
const showloadError = (message) => {
  const loadingError = loadErrorTemplate.cloneNode(true);
  if (message) {
    loadingError.querySelector('.data-error__title').textContent = message;
  }

  body.append(loadingError);

  const loadingErrorArea = body.querySelector('.data-error');

  setTimeout(() => {
    loadingErrorArea.remove();
  }, ERROR_SHOW_TIME);
};

// Ошибка при отправке формы

const openSendError = () => {
  const sendingError = sendErrorTemplate.cloneNode(true);
  body.append(sendingError);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onErrorKeydown);
};

function closeSendError() {
  const sendingErrorArea = body.querySelector('.error');
  sendingErrorArea.remove();
  document.removeEventListener('keydown', onErrorKeydown);
  document.addEventListener('keydown', onDocumentKeydown);
}

const initErrorMessage = () => {
  openSendError();

  const errorFormButton = document.querySelector('.error__button');
  const errorInner = document.querySelector('.error__inner');

  errorFormButton.addEventListener('click', () => {
    closeSendError();
  });

  document.addEventListener('click', (e) => {
    const click = e.composedPath().includes(errorInner);
    if (!click) {
      closeSendError();
    }
  });
};

// Успешная отправка формы

const openSendSuccess = () => {
  const sendingSuccess = sendSuccessTemplate.cloneNode(true);
  body.appendChild(sendingSuccess);
  document.addEventListener('keydown', onSuccessKeydown);
};

function closeSendSuccess() {
  const sendingSuccessArea = body.querySelector('.success');
  sendingSuccessArea.remove();
  document.removeEventListener('keydown', onSuccessKeydown);
}

const initSuccessMessage = () => {
  openSendSuccess();

  const successFormButton = document.querySelector('.success__button');
  const sendingSuccessInner = document.querySelector('.success__inner');

  successFormButton.addEventListener('click', () => {
    closeSendSuccess();
  });

  document.addEventListener('click', (e) => {
    const click = e.composedPath().includes(sendingSuccessInner);
    if (!click) {
      closeSendSuccess();
    }
  });
};

export { showloadError, initErrorMessage, initSuccessMessage };
