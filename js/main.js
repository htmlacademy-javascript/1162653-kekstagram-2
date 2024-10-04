import { generatePhotos } from './data.js';
import { renderThumbnails } from './thumbnail.js';

const photosDescriptions = generatePhotos();
renderThumbnails(photosDescriptions);
