const uploadPictureForm = document.querySelector('.img-upload__form');
const hashtagsField = uploadPictureForm.querySelector('.text__hashtags');
const commentField = uploadPictureForm.querySelector('.text__description');

const HASHTAGS_RULE = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_COUNT = 5;
const COMMENT_LENGTH = 140;
let invalidHashtag = '';

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
  return hashtags.length <= 5;
};

// Проверка на уникальность
const validateHashtagUnique = (value) => {
  const hashtags = transformHashtags(value);
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

// Проверка на соответствие правилам написания хештегов
const validateHashtagPattern = (value) => {
  const hashtags = transformHashtags(value);
  invalidHashtag = '';
  const isValid = hashtags.every((hashtag) => {
    if (!HASHTAGS_RULE.test(hashtag)) {
      invalidHashtag = hashtag;
      return false;
    }
    return true;
  });
  return isValid;
};

// Валидлация комментария
const validateComment = (value) => value.length <= COMMENT_LENGTH;

// Совершаем проверку и присваиваем ошибки
pristine.addValidator(
  commentField,
  validateComment,
  `Краткость — сестра таланта. Сократите текст до "${COMMENT_LENGTH}" символов`
);

pristine.addValidator(
  hashtagsField,
  validateHashtagPattern,
  () => `Неверный формат хэштега: "${invalidHashtag}"`,
  1,
  true
);

pristine.addValidator(
  hashtagsField,
  validateHashtagUnique,
  'Хэштеги не должны повторяться',
  2,
  true
);

pristine.addValidator(
  hashtagsField,
  validateHashtagsCount,
  `Не больше "${HASHTAGS_COUNT}" хэштегов`,
  3,
  true
);

// Функция проверки формы
const validateForm = () => pristine.validate();

// Функция сброса ошибок
const resetValidateForm = () => pristine.reset();

export { validateForm, resetValidateForm };
