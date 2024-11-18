const uploadPictureForm = document.querySelector('.img-upload__form');
const hashtagsField = uploadPictureForm.querySelector('.text__hashtags');
const commentField = uploadPictureForm.querySelector('.text__description');

const HASHTAGS_RULE = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAGS_COUNT = 5;
const COMMENT_LENGTH = 140;

// Добавляем валидацию формы с хештегом и комментарием
const pristine = new Pristine(uploadPictureForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

// Валидация хештегов
const validateHashtags = (value) => {
  const hashtags = value.toLowerCase().trim().split(/\s+/).filter((item) => item);
  const uniqueHashtags = new Set(hashtags);

  if (!hashtags) {
    return true;
  }

  if (hashtags.length > HASHTAGS_COUNT) {
    return `Не больше "${HASHTAGS_COUNT}" хэштегов`;
  }

  if (uniqueHashtags.size !== hashtags.length) {
    return 'Хэштеги не должны повторяться';
  }

  for (const hashtag of hashtags) {
    if (!HASHTAGS_RULE.test(hashtag)) {
      return `Неверный формат хэштега: "${hashtag}"`;
    }
  }

  return true;
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
  (value) => {
    const validationResult = validateHashtags(value);
    return validationResult === true;
  },
  (value) => validateHashtags(value),
);

// Реализуем отправку формы при успешной валидации
uploadPictureForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    hashtagsField.value = hashtagsField.value.trim().replaceAll(/\s+/g, ' ');
    uploadPictureForm.submit();
  }
});
