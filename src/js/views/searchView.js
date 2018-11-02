import { elements } from './base';

export const getSelectValue = () => elements.searchCategory.value;

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, totalPhotos, photosPerPage) => {
    const pages = Math.ceil(totalPhotos/photosPerPage);

    let button; 
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterend', button);
}

const renderPhoto = photo => {
    const markup = `
        <div class="picFrame">
            <img class="renderedPics" src="${photo}"> 
        </div>
    `;
    elements.searchResPages.insertAdjacentHTML('beforeend', markup);
};
export const renderResults = (photos, page = 1, photosPerPage = 12) => {
    const start = 0,
    end = 10;
    photos.slice(start, end).forEach(renderPhoto);
   // renderButtons(page, photos.length, photosPerPage);
} 
