const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const pictureChooser = document.querySelector('.img-upload__input');
const picturePreview = document.querySelector('.img-upload__preview img');

const showUserPicture = () => {
  pictureChooser.addEventListener('change', () => {
    const file = pictureChooser.files[0];
    const pictureName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => pictureName.endsWith(it));

    if (matches) {
      picturePreview.src = URL.createObjectURL(file);
    }
  });
};

export { showUserPicture };
