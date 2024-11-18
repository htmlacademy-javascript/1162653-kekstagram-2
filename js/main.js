import { generatePhotos } from './data.js';
import { initGallery } from './gallery.js';
import './upload-form.js';
import './form-validation.js';
import './picture-editor.js';

// Создаем данные
const photos = generatePhotos();
// Инициализируем галерею миниатюр
initGallery(photos);
