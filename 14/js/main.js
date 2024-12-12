import { initGallery } from './gallery.js';
import { setUploadFormSubmit, closePictureEditor } from './upload-form.js';
import { getData } from './api.js';
import { showLoadError } from './user-messages.js';
import { initFilter } from './filter.js';
import { showUserPicture } from './user-picture.js';

getData()
  .then((pictures) => {
    initGallery(pictures);
    initFilter(pictures);
  })
  .catch((err) => {
    showLoadError(err.message);
  });

setUploadFormSubmit(closePictureEditor);

showUserPicture();
