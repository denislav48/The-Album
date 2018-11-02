import { elements } from './base';

export const getSelectValue = () => elements.searchCategory.value;

const createButton = (page) => `
      <button type="button" onClick="paginate(${page})">${page}</button>
`;

const renderButtons = (page, totalPhotos, photosPerPage) => {
    const pages = Math.ceil(totalPhotos / photosPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = `
        ${createButton(page)}
        `;

    } else if (page < pages) {
        // Both buttons
        // for (let i = ; i )


    } else if (page === pages && pages > 1) {
        // Only button to go to prev page

    }

    elements.searchResPages.insertAdjacentHTML('afterend', button);
}

function paginate() {

}

const renderPhoto = photo => {
    const markup = `
        <div class="picFrame">
            <img class="renderedPics" src="${photo.downloadURL} alt="${photo.title}"> 
        </div>
    `;
    elements.searchResPages.insertAdjacentHTML('beforeend', markup);
};
export const renderResults = (photos, page = 1, photosPerPage = 15) => {
    const start = (page - 1) * photosPerPage,
        end = page * photosPerPage;
    photos.slice(start, end).forEach(renderPhoto);
    renderButtons(page, photos.length, photosPerPage);
} 
