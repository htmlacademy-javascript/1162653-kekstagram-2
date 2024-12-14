const COMMENT_LENGTH = 140;

import { uploadPictureForm } from './util.js';

const hashtagsField = uploadPictureForm.querySelector('.text__hashtags');
const commentField = uploadPictureForm.querySelector('.text__description');

const HashtagRule = {
  PATTERN: /^#[a-zа-яё0-9]{1,19}$/i,
  LENGTH: 20,
  COUNT: 5,
};

let hashtagErrors = [];

// Добавляем валидацию формы с хештегом и комментарием
const pristine = new Pristine(uploadPictureForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

// Валидация хештегов
// Преобразуем строку в массив хештегов
const transformHashtags = (value) => value.toLowerCase().trim().split(/\s+/).filter((item) => item);

// Проверка на количество хештегов
const validateHashtagsCount = (value) => {
  const hashtags = transformHashtags(value);
  return hashtags.length <= HashtagRule.COUNT;
};

// Проверка на уникальность
const validateHashtagUnique = (value) => {
  const hashtags = transformHashtags(value);
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

// Проверка на разделение пробелами
const validateHashtagSpacing = (value) => !value.includes('##');

// Проверка на соответствие правилам написания хештегов
const validateHashtagPattern = (value) => {
  const hashtags = transformHashtags(value);
  hashtagErrors = [];

  if (!validateHashtagSpacing(value)) {
    return true;
  }

  hashtags.forEach((hashtag) => {
    if (!hashtag.startsWith('#')) {
      hashtagErrors.push(`Хэштег ${hashtag} должен начинаться с символа #.`);
    } else if (hashtag.length === 1) {
      hashtagErrors.push(`Хэштег ${hashtag} не может состоять только из #.`);
    } else if (hashtag.length > HashtagRule.LENGTH) {
      hashtagErrors.push(`Хэштег ${hashtag} не может содержать более ${HashtagRule.LENGTH} символов.`);
    } else if (!HashtagRule.PATTERN.test(hashtag)) {
      hashtagErrors.push(`Хэштег ${hashtag} должен состоять только из букв и чисел`);
    }
  });

  return hashtagErrors.length === 0;
};

// Валидлация комментария
const validateComment = (value) => value.length <= COMMENT_LENGTH;

// Совершаем проверку и присваиваем ошибки
pristine.addValidator(
  commentField,
  validateComment,
  `Краткость — сестра таланта. Сократите текст до ${COMMENT_LENGTH} символов`
);

pristine.addValidator(
  hashtagsField,
  validateHashtagPattern,
  () => hashtagErrors.join('<br>'),
  1
);

pristine.addValidator(
  hashtagsField,
  validateHashtagUnique,
  'Хэштеги не должны повторяться',
  2
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  `Слишком много хештегов! Добавьте не больше ${HashtagRule.COUNT}`,
  3
);

pristine.addValidator(
  hashtagsField,
  validateHashtagSpacing,
  'Хештеги должны разделяться пробелами',
  4
);

// Функция проверки формы
const validateForm = () => pristine.validate();

// Функция сброса ошибок
const resetValidateForm = () => pristine.reset();

export { validateForm, resetValidateForm };
