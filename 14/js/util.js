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


export { isEscapeKey, debounce };
