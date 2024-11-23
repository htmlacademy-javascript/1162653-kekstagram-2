const effectsSlider = document.querySelector('.effect-level__slider');
const effectsContainer = effectsSlider.parentElement;
const effectsValue = document.querySelector('.effect-level__value');
const effectRadios = document.querySelectorAll('.effects__radio');
const picturePreview = document.querySelector('.img-upload__preview img');

const DEFAULT_VALUE = 100;

// Настройки для каждого эффекта
const effectSettings = {
  none: { filter: 'none', unit: '', range: { min: 0, max: 100, }, start: 0, step: 10, connect: 'lower' },
  chrome: { filter: 'grayscale', unit: '', min: 0, max: 1, step: 0.1 },
  sepia: { filter: 'sepia', unit: '', min: 0, max: 1, step: 0.1 },
  marvin: { filter: 'invert', unit: '%', min: 0, max: 100, step: 1 },
  phobos: { filter: 'blur', unit: 'px', min: 0, max: 3, step: 0.1 },
  heat: { filter: 'brightness', unit: '', min: 1, max: 3, step: 0.1 },
};

// Создаем слайдер и задаем апдейт значения
effectsValue.value = DEFAULT_VALUE;

noUiSlider.create(effectsSlider, effectSettings.none);

effectsSlider.noUiSlider.on('update', () => {
  effectsValue.value = effectsSlider.noUiSlider.get();
});

// Функция изменения фильтра
const onEffectChange = (evt) => {
  const effect = evt.target.value;

  if (effect === effectSettings.none.filter) {
    effectsSlider.parentElement.classList.add('hidden');
    picturePreview.style.filter = '';
    effectsValue.value = '';
    return;
  }

  effectsContainer.classList.remove('hidden');
  const { filter, unit, min, max, step } = effectSettings[effect];

  effectsSlider.noUiSlider.updateOptions({
    range: { min, max },
    start: max,
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

// Обработчик события для каждой радиокнопки
effectRadios.forEach((radio) => {
  radio.addEventListener('change', onEffectChange);
});

export { resetEffects, initializeEffects };
