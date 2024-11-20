import { generatePhotos } from './data.js';
import { initGallery } from './gallery.js';
import './upload-form.js';

// Создаем данные
const photos = generatePhotos();
// Инициализируем галерею миниатюр
initGallery(photos);
