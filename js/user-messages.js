import { isEscapeKey } from './util.js';

const ERROR_SHOW_TIME = 5000;

const body = document.body;
const loadErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
const sendErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const sendSuccessTemplate = document.querySelector('#success').content.querySelector('.success');

// Сопоставление типа модального окна с шаблоном
const modalTypeToTemplate = {
  success: sendSuccessTemplate,
  error: sendErrorTemplate,
};

// Закрытие модального окна
const closeModal = () => {
  const modal = body.querySelector('.modal');
  if (modal) {
    modal.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

// Обработчик клавиши Escape для закрытия модального окна
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

// Универсальное открытие модального окна
const showModal = (type) => {
  const modalTemplate = modalTypeToTemplate[type];
  const modal = modalTemplate.cloneNode(true);

  modal.classList.add('modal');
  body.append(modal);

  const closeButton = modal.querySelector(`.${type}__button`);
  closeButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (evt) => {
    if (evt.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', onDocumentKeydown);
};

// Ошибка загрузки данных
const showLoadError = (message) => {
  const loadError = loadErrorTemplate.cloneNode(true);
  if (message) {
    loadError.querySelector('.data-error__title').textContent = message;
  }

  body.append(loadError);

  setTimeout(() => {
    loadError.remove();
  }, ERROR_SHOW_TIME);
};

export { showLoadError, showModal };

