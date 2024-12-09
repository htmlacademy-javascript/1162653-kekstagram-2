import { debounce } from './util.js';
import { initGallery } from './gallery.js';

const picturesFilter = document.querySelector('.img-filters');
const ACTIVE_BUTTON = 'img-filters__button--active';

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed'
};

const FILTER_RULE = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length
};

const RANDOM_PICTURE_COUNT = 10;
const DEBOUNCE_DELAY = 500;

let currentFilter = FILTER.default;
let pictures = [];

const debouncedGallery = debounce(initGallery, DEBOUNCE_DELAY);

// Функция с определением типа фильтрации
const createFilter = () => {
  let filteredPictures = [];

  switch (currentFilter) {
    case FILTER.default: filteredPictures = pictures;
      break;
    case FILTER.random:
      filteredPictures = pictures.slice().sort(FILTER_RULE.random).slice(0, RANDOM_PICTURE_COUNT);
      break;
    case FILTER.discussed: filteredPictures = pictures.slice().sort(FILTER_RULE.discussed);
      break;
  }

  debouncedGallery(filteredPictures);
};

// Применение фильтра при выборе кнопки
const onFilterChange = (evt) => {
  const targetButton = evt.target;

  if (!targetButton.matches('.img-filters__button')) {
    return;
  }

  if (targetButton.id === currentFilter) {
    return;
  }

  const activeButton = document.querySelector(`.${ACTIVE_BUTTON}`);
  activeButton.classList.remove(ACTIVE_BUTTON);
  targetButton.classList.add(ACTIVE_BUTTON);

  currentFilter = targetButton.id;
  createFilter();
};

// Инициализация фильтра
const initFilter = (loadedPictures) => {
  pictures = loadedPictures;

  picturesFilter.classList.remove('img-filters--inactive');
  picturesFilter.addEventListener('click', onFilterChange);
};

export { initFilter };

