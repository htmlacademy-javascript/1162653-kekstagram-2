import { generatePhotos } from './data.js';
import { initGallery } from './gallery.js';

// Создаем данные
const photos = generatePhotos();
// Инициализируем галерею миниатюр
initGallery(photos);
