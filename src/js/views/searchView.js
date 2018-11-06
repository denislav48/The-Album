import { elements } from './base';

export const getSelectValue = () => elements.searchCategory.value;

const createButton = (page) => {
    if (page === 1) {
        return `<button class="pagination-button active" type="button" value="${page}"">${page}</button>`
    } else {
        return `<button class="pagination-button" type="button" value="${page}"">${page}</button>`
    }
};


const renderButtons = (page, totalPhotos, photosPerPage) => {
    const pages = Math.ceil(totalPhotos / photosPerPage);

    let button = createButton(1);

    if (page === 1 && pages === 1) {
        // Only button to go to next page
        button = `${createButton(page)}`;
    } else if (page <= pages) {
        // Both buttons
        for (let i = 2; i <= pages; i += 1) {
            button += `${createButton(i)}`;
        }
    }

    elements.paginationNavigation.insertAdjacentHTML('beforeend', button);
}

const renderPhoto = photo => {
    const markup = `
        <div class="picFrame myImg">
            <ul class="picInfo list-inline mx-auto justify-content-center">
                <li class="list-inline-item"><span class="date">${photo.title.split('').splice(0,15).join('')}</span></li>            
            </ul>
            <img class="renderedPics" src="${photo.downloadURL} alt="${photo.title}"> 
            <ul class="picInfo list-inline mx-auto justify-content-center">
                <li class="list-inline-item">Posted by <span class="name">${photo.username}</span></li>
                <li class="list-inline-item"><span class="date">${photo.date.split('T').splice(0, 1)}</span></li>            
            </ul>
        </div>
    `;
    elements.searchResPages.insertAdjacentHTML('beforeend', markup);
};

const renderResults = (photos, page = 1, photosPerPage = 10) => {
    const start = (page - 1) * photosPerPage,
        end = page * photosPerPage;
    photos.slice(start, end).forEach(renderPhoto);

    if (page === 1) {
        renderButtons(page, photos.length, photosPerPage);
    }

}

//Search by category and title
export const orderByCategory = (state, val, query, page) => {
    let results = state.search.result;

    let categoryResults = [];
    let value;

    if (val) {
        value = val.toLowerCase();
    }
    if (query && query !== 'All') {
        Object.keys(results).forEach(pic => {
            if (results[pic].category === query && (val ? (results[pic].title.toLowerCase().search(value) !== -1) : true)) {
                categoryResults.push(results[pic]);
            }
        });
    } else if (query && query === 'All') {
        Object.keys(results).forEach(pic => {
            if (val ? (results[pic].title.toLowerCase().search(value) !== -1) : true) {
                categoryResults.push(results[pic]);
            }
        });
    }

    categoryResults.reverse();
    console.log(categoryResults.length);
    renderResults(categoryResults, page);

}

