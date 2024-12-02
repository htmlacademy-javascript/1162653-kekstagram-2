const pictiresFilter = document.querySelector('.img-filters');

// Функция для показа фильтра
const showPictiresFilter = () => {
  pictiresFilter.classListremove('img-filters--inactive');
};

export { showPictiresFilter };
