import { debounce } from './util.js';
import { renderThumbnails } from './thumbnail.js';

const RANDOM_PICTURE_COUNT = 10;
const DEBOUNCE_DELAY = 500;
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterRule = {
  [Filter.RANDOM]: () => 0.5 - Math.random(),
  [Filter.DISCUSSED]: (a, b) => b.comments.length - a.comments.length
};

const picturesFilter = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

const debouncedRenderThumbnails = debounce(renderThumbnails, DEBOUNCE_DELAY);

// Функция с определением типа фильтрации
const getFilteredPictures = () => {

  switch (currentFilter) {

    case Filter.RANDOM:
      return pictures.slice().sort(filterRule[currentFilter]).slice(0, RANDOM_PICTURE_COUNT);

    case Filter.DISCUSSED:
      return pictures.slice().sort(filterRule[currentFilter]);

    case Filter.DEFAULT:
      return pictures;

    default:
      return pictures;
  }
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

  const activeButton = document.querySelector(`.${ACTIVE_FILTER_CLASS}`);
  activeButton.classList.remove(ACTIVE_FILTER_CLASS);
  targetButton.classList.add(ACTIVE_FILTER_CLASS);

  currentFilter = targetButton.id;
  debouncedRenderThumbnails(getFilteredPictures());
};

// Инициализация фильтра
const initFilter = (loadedPictures) => {
  pictures = loadedPictures;

  picturesFilter.classList.remove('img-filters--inactive');
  picturesFilter.addEventListener('click', onFilterChange);
};

export { initFilter };
