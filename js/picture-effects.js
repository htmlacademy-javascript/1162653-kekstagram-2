import { picturePreview } from './util.js';

const DEFAULT_VALUE = 100;

const effectsSlider = document.querySelector('.effect-level__slider');
const effectsContainer = effectsSlider.parentElement;
const effectsValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');

// Настройки для каждого эффекта
const effectSettings = {
  none: { filter: 'none', unit: '', range: { min: 0, max: 100 }, start: 0, step: 10 },
  chrome: { filter: 'grayscale', unit: '', range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  sepia: { filter: 'sepia', unit: '', range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  marvin: { filter: 'invert', unit: '%', range: { min: 0, max: 100 }, start: 100, step: 1 },
  phobos: { filter: 'blur', unit: 'px', range: { min: 0, max: 3 }, start: 3, step: 0.1 },
  heat: { filter: 'brightness', unit: '', range: { min: 1, max: 3 }, start: 3, step: 0.1 },
};

// Создаем слайдер и задаем апдейт значения
effectsValue.value = DEFAULT_VALUE;
noUiSlider.create(effectsSlider, {
  ...effectSettings.none,
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
  connect: 'lower',
});

effectsSlider.noUiSlider.on('update', () => {
  effectsValue.value = effectsSlider.noUiSlider.get();
});

// Функция изменения фильтра
const onEffectChange = (effect) => {
  if (effect === 'none') {
    effectsSlider.parentElement.classList.add('hidden');
    picturePreview.style.filter = '';
    effectsValue.value = '';
    return;
  }

  effectsContainer.classList.remove('hidden');
  const { filter, unit, range, step } = effectSettings[effect];

  effectsSlider.noUiSlider.updateOptions({
    range,
    start: range.max,
    step,
  });

  effectsSlider.noUiSlider.on('update', () => {
    const value = effectsSlider.noUiSlider.get();
    picturePreview.style.filter = `${filter}(${value}${unit})`;
    effectsValue.value = value;
  });
};

// Функция для сброса эффекта
const resetEffects = () => {
  picturePreview.style.filter = '';
  effectsValue.value = DEFAULT_VALUE;
  effectsSlider.noUiSlider.set(DEFAULT_VALUE);
  effectsContainer.classList.add('hidden');
  document.querySelector(`#effect-${effectSettings.none.filter}`).checked = true;
  effectsSlider.noUiSlider.off('update');
};

// Функция для скрытия слайдера при открытии изображения
const initializeEffects = () => {
  resetEffects();
  effectsContainer.classList.add('hidden');
};

// Обработчик событий с делегированием на список эффектов
effectList.addEventListener('change', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    onEffectChange(evt.target.value);
  }
});

export { resetEffects, initializeEffects };
