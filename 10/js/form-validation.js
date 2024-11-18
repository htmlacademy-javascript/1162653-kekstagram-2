const uploadPictureForm = document.querySelector('.img-upload__form');
const hashtagsField = uploadPictureForm.querySelector('.text__hashtags');
const commentField = uploadPictureForm.querySelector('.text__description');

// Добавляем валидацию формы с хештегом и комментарием
const pristine = new Pristine(uploadPictureForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

// Валидация хештегов
function validateHashtags(value) {
  const hashtagsText = value.toLowerCase().trim();
  const hashtags = hashtagsText.split(/\s+/);
  const uniqueHashtags = new Set(hashtags);

  const hashtagsRule = /^#[a-zа-яё0-9]{1,19}$/i;

  if (!hashtagsText) {
    return true;
  }

  if (hashtags.length > 5) {
    return 'Не больше 5 хэштегов';
  }

  if (uniqueHashtags.size !== hashtags.length) {
    return 'Хэштеги не должны повторяться';
  }

  for (const hashtag of hashtags) {
    if (!hashtagsRule.test(hashtag)) {
      return `Неверный формат хэштега: "${hashtag}"`;
    }
  }

  return true; // Все проверки пройдены
}

// Валидлация комментария
function validateComment(value) {
  return value.length <= 140;
}

// Совершаем проверку и присваиваем ошибки
pristine.addValidator(
  commentField,
  validateComment,
  'Краткость — сестра таланта. Сократите текст до 140 символов'
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
