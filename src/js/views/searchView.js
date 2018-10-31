import { elements } from './base';

export const getSelectValue = () => elements.searchCategory.value;

const renderPhoto = photo => {
    const markup = `
        <div class="picFrame">
            <img class="renderedPics" src="${photo}" alt="${photo.title}"> 
        </div>
    `;
    elements.searchResPages.insertAdjacentHTML('beforeend', markup);
};
export const renderResults = (photos, page = 1, photosPerPage = 10) => {
    const start = 0,
    end = 10;
    photos.slice(start, end).forEach(renderPhoto);
} 
