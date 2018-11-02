import { elements } from './base';

export const getSelectValue = () => elements.searchCategory.value;

const renderPhoto = photo => {
    const markup = `
        <div class="picFrame">
            <img class="renderedPics" src="${photo}"> 
        </div>
    `;
    elements.searchResPages.insertAdjacentHTML('beforeend', markup);
};
export const renderResults = (photos) => {
 photos.forEach(renderPhoto);
} 
