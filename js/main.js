import { initGallery } from './gallery.js';
import { setUploadFormSubmit, closePictureEditor } from './upload-form.js';
import { getData } from './api.js';
import { showloadError, initSuccessMessage } from './user-messages.js';
import { showUserPicture } from './user-picture.js';

getData()
  .then((pictures) => {
    initGallery(pictures);
  })
  .catch(
    (err) => {
      showloadError(err.message);
    }
  );

setUploadFormSubmit(closePictureEditor, initSuccessMessage);

showUserPicture();
