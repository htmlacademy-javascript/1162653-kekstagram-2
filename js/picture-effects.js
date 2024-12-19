import { picturePreview } from './util.js';

const effectsSlider = document.querySelector('.effect-level__slider');
const effectsContainer = effectsSlider.parentElement;
const effectsValue = document.querySelector('.effect-level__value');
const effectList = document.querySelector('.effects__list');

// Настройки для каждого эффекта
const effectSettings = {
  none: {
    filter: 'none',
    unit: '',
    range: {
      min: 0,
      max: 100
    },
    start: 0,
    step: 10
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1
  },
  heat: {
    filter: 'brightness',
    unit: '',
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1
  },
};

// Переменная для текущего эффекта
let currentEffect = effectSettings.none;

// Создаем слайдер и задаем апдейт значения
noUiSlider.create(effectsSlider, {
  range: currentEffect.range,
  start: currentEffect.start,
  step: currentEffect.step,
  format: {
    to: (value) => Number.isInteger(value)
      ? value.toFixed(0)
      : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
  connect: 'lower',
});

// Обновление значений слайдера и применение фильтра
effectsSlider.noUiSlider.on('update', () => {
  const { filter, unit } = currentEffect;
  const value = effectsSlider.noUiSlider.get();

  effectsValue.value = value;

  if (filter !== 'none') {
    picturePreview.style.filter = `${filter}(${value}${unit})`;
  } else {
    picturePreview.style.filter = '';
  }
});

// Функция для обновления опций слайдера
const updateSliderOptions = () => {
  const { range, start, step } = currentEffect;

  effectsSlider.noUiSlider.updateOptions({
    range,
    start,
    step,
  });
};

// Функция для применения нового эффекта
const applyEffect = (effectName) => {
  currentEffect = effectSettings[effectName];

  updateSliderOptions();

  if (effectName === 'none') {
    effectsContainer.classList.add('hidden');
  } else {
    effectsContainer.classList.remove('hidden');
  }
};

// Функция сброса эффекта
const resetEffects = () => {
  applyEffect('none');
};

// Функция для обработки изменения эффекта
const onEffectChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    const effectName = evt.target.value;
    applyEffect(effectName);
  }
};

// Обработчик событий с делегированием на список эффектов
effectList.addEventListener('change', onEffectChange);

export { resetEffects };
