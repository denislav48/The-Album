import { elements } from './base';

export const getSelectValue = () => elements.searchCategory.value;

const createButton = (page) => {
    if (page === 1) {
        return `<button class="btn pagination-button active" type="button" value="${page}"">${page}</button>`
    } else {
        return `<button class="btn pagination-button" type="button" value="${page}"">${page}</button>`
    }
};


const renderButtons = (page, totalPhotos, photosPerPage) => {
    const pages = Math.ceil(totalPhotos / photosPerPage);

    let button = createButton(1);

    if (page === 1 && pages === 1) {
        //if there is only one button
        button = `${createButton(page)}`;
    } else if (page <= pages) {
        //if there are more buttons
        for (let i = 2; i <= pages; i += 1) {
            button += `${createButton(i)}`;
        }
    }

    elements.paginationNavigation.innerHTML += button;
}

const renderPhoto = photo => {

    const empty = `
    <p class="error justify-content-center">No results found</p>
`;
    if (photo) {
        const markup = `
        <div class="picFrame myImg">
            <ul class="picInfo list-inline mx-auto justify-content-center">
                <li class="list-inline-item"><span class="date">${photo.title.length <= 20 ? photo.title : photo.title.split('').splice(0, 21).join('') + '...'}</span></li>            
            </ul>
            <img class="renderedPics" src="${photo.downloadURL} alt="${photo.title}"> 
            <ul class="picInfo list-inline mx-auto justify-content-center">
                <li class="list-inline-item">Posted by <span class="name">${photo.username}</span></li>
                <li class="list-inline-item"><span class="date">${photo.date.split('T').splice(0, 1)}</span></li>            
            </ul>
        </div>
    `;

        elements.searchResPages.innerHTML += markup;
    } else {

        elements.searchResPages.innerHTML += empty;
        elements.paginationNavigation.innerHTML = '';
    }
};

const renderResults = (photos, page = 1, photosPerPage = 10) => {
    const start = (page - 1) * photosPerPage,
        end = page * photosPerPage;


//Render buttons only on new search
    if (page === 1) {
        renderButtons(page, photos.length, photosPerPage);
    }

    photos.slice(start, end).forEach(renderPhoto);
}

//Search by category and title
export const orderByCategory = (state, val, query, page) => {
    const results = state.search.result;
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
    //console.log(categoryResults);
    if (categoryResults.length > 0) {
        renderResults(categoryResults, page);
    } else {
        renderResults([undefined], page);
    }
}

