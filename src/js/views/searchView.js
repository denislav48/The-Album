import { elements } from './base';

export const getInput = () => elements.searchCategory.value;

const renderPhoto = photo => {
    const markup = `
        <div class="picFrame">
            <img class="renderedPics" src="${photo}" alt="${photo.title}"> 
        </div>
    `;
    elements.searchResPages.insertAdjacentHTML('beforeend', markup);
};
export const renderResults = photos => {
    photos.forEach(renderPhoto);
} 
