import { generatePhotos } from './data.js';
import { initGallery } from './gallery.js';
import './upload-form.js';
import './picture-resizer.js';
import './picture-effects.js';

// Создаем данные
const photos = generatePhotos();
// Инициализируем галерею миниатюр
initGallery(photos);
